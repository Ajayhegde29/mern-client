const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/authMiddleware');

// Get all todos for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('❌ Error fetching todos:', error);
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
});

// Create a new todo
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Text is required and cannot be empty' });
    }
    
    const newTodo = new Todo({ 
      userId: req.user.id, 
      text: text.trim(),
      completed: false
    });
    
    await newTodo.save();
    res.status(201).json(newTodo);
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
});

// Update a todo (toggle completion or update text)
router.put('/:id', auth, async (req, res) => {
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
    
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
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
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting todo:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid todo ID format' });
    }
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
});

module.exports = router;
