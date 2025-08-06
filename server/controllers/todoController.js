const Todo = require('../models/Todo');

// In-memory storage for todos when MongoDB is not available
const inMemoryTodos = new Map();
let todoIdCounter = 1;

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  return Todo.db && Todo.db.readyState === 1;
};

// Get all todos for the logged-in user
exports.getTodos = async (req, res) => {
  try {
    if (isMongoConnected()) {
      // Use MongoDB
      const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
      res.json(todos);
    } else {
      // Use in-memory storage
      const userTodos = Array.from(inMemoryTodos.values())
        .filter(todo => todo.userId === req.user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.json(userTodos);
    }
  } catch (error) {
    console.error('❌ Error fetching todos:', error);
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Text is required and cannot be empty' });
    }
    
    if (isMongoConnected()) {
      // Use MongoDB
      const newTodo = new Todo({ 
        userId: req.user.id, 
        text: text.trim(),
        completed: false
      });
      
      await newTodo.save();
      res.status(201).json(newTodo);
    } else {
      // Use in-memory storage
      const newTodo = {
        _id: `todo_${todoIdCounter++}`,
        userId: req.user.id,
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      inMemoryTodos.set(newTodo._id, newTodo);
      res.status(201).json(newTodo);
    }
  } catch (error) {
    console.error('❌ Error creating todo:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updateData = {};
    
    if (text !== undefined) {
      if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Text is required and cannot be empty' });
      }
      updateData.text = text.trim();
    }
    
    if (completed !== undefined) {
      updateData.completed = completed;
    }
    
    if (isMongoConnected()) {
      // Use MongoDB
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      
      res.json(todo);
    } else {
      // Use in-memory storage
      const todo = inMemoryTodos.get(req.params.id);
      
      if (!todo || todo.userId !== req.user.id) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      
      // Update the todo
      Object.assign(todo, updateData);
      todo.updatedAt = new Date();
      
      res.json(todo);
    }
  } catch (error) {
    console.error('❌ Error updating todo:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid todo ID format' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    if (isMongoConnected()) {
      // Use MongoDB
      const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
      
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      
      res.json({ message: 'Todo deleted successfully' });
    } else {
      // Use in-memory storage
      const todo = inMemoryTodos.get(req.params.id);
      
      if (!todo || todo.userId !== req.user.id) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      
      inMemoryTodos.delete(req.params.id);
      res.json({ message: 'Todo deleted successfully' });
    }
  } catch (error) {
    console.error('❌ Error deleting todo:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid todo ID format' });
    }
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
}; 