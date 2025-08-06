const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();

// ======= MIDDLEWARE =======
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Parse JSON body with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ======= REQUEST LOGGING MIDDLEWARE =======
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ======= ROOT ROUTE =======
app.get('/', (req, res) => {
  res.json({ 
    message: 'MERN Todo App Backend API',
    status: 'Server is running ✅',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      api: '/api',
      auth: '/api/auth',
      todos: '/api/todos'
    }
  });
});

// ======= TEST ROUTE =======
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API is running ✅',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ======= MOUNT ROUTES =======
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// ======= 404 HANDLER =======
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ======= ERROR HANDLING MIDDLEWARE =======
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Validation error', 
      error: Object.values(err.errors).map(error => error.message) 
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value' });
  }
  
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// ======= DATABASE CONNECTION =======
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Stop the server if DB fails
});

// ======= GRACEFUL SHUTDOWN =======
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT. Closing server gracefully...');
  try {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM. Closing server gracefully...');
  try {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
});

// ======= START SERVER =======
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API URL: http://localhost:${PORT}/api`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});
