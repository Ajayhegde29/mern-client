
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();

// ========== MIDDLEWARE ==========
const allowedOrigins = [
  'http://localhost:3000',
  'https://mern-client-yj3h-git-master-ajayhegde29s-projects.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ========== ROUTES ==========
app.get('/', (req, res) => {
  res.json({
    message: '📝 MERN To-Do App API',
    version: '1.0.0',
    status: '✅ Running',
    endpoints: {
      auth: '/api/auth',
      todos: '/api/todos',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// ========== 404 ==========
app.use('*', (req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// ========== GLOBAL ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate key error', fields: err.keyValue });
  }

  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// ========== DATABASE CONNECTION ==========
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.warn('⚠️ No MONGO_URI provided. Using in-memory development mode.');
} else {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
}

// ========== START SERVER ==========
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ========== GRACEFUL SHUTDOWN ==========
const shutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down...`);
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Shutdown error:', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// ========== HANDLE PORT ERRORS ==========
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server startup error:', err);
  }
  process.exit(1);
});
