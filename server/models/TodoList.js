const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: [true, 'Todo item text is required'],
    trim: true,
    minlength: [1, 'Todo item text cannot be empty']
  },
  completed: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const todoListSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'] 
  },
  title: { 
    type: String, 
    required: [true, 'Todo list title is required'],
    trim: true,
    minlength: [1, 'Todo list title cannot be empty'],
    maxlength: [100, 'Todo list title cannot exceed 100 characters']
  },
  items: [todoItemSchema]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for getting completed items count
todoListSchema.virtual('completedCount').get(function() {
  return this.items.filter(item => item.completed).length;
});

// Virtual for getting total items count
todoListSchema.virtual('totalCount').get(function() {
  return this.items.length;
});

// Index for better query performance
todoListSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('TodoList', todoListSchema);
