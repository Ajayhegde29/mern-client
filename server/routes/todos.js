const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// Get all todos for the logged-in user
router.get('/', auth, getTodos);

// Create a new todo
router.post('/', auth, createTodo);

// Update a todo (toggle completion or update text)
router.put('/:id', auth, updateTodo);

// Delete a todo
router.delete('/:id', auth, deleteTodo);

module.exports = router;
