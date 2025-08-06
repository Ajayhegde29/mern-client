const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'] 
  },
  text: { 
    type: String, 
    required: [true, 'Todo text is required'],
    trim: true,
    minlength: [1, 'Todo text cannot be empty'],
    maxlength: [500, 'Todo text cannot exceed 500 characters']
  },
  completed: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
todoSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Todo', todoSchema); 