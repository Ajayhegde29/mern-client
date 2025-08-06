const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory storage for development when MongoDB is not available
const inMemoryUsers = new Map();
let userIdCounter = 1;

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  return User.db && User.db.readyState === 1;
};

exports.registerUser = async (req, res) => {
  try {
    console.log('📥 Register Payload:', req.body); // Debug

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const emailLower = email.toLowerCase().trim();

    // Check if MongoDB is connected
    if (isMongoConnected()) {
      // Use MongoDB
      const existingUser = await User.findOne({ email: emailLower });
      if (existingUser) {
        console.log('⚠️ User already exists:', email);
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save new user
      const newUser = new User({ 
        email: emailLower, 
        password: hashedPassword 
      });
      await newUser.save();

      console.log('✅ User registered (MongoDB):', newUser.email);
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      // Use in-memory storage
      if (inMemoryUsers.has(emailLower)) {
        console.log('⚠️ User already exists (in-memory):', email);
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save to in-memory storage
      const newUser = {
        id: userIdCounter++,
        email: emailLower,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      inMemoryUsers.set(emailLower, newUser);

      console.log('✅ User registered (in-memory):', newUser.email);
      res.status(201).json({ message: 'User registered successfully' });
    }

  } catch (err) {
    console.error('❌ Register Error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: Object.values(err.errors).map(error => error.message) 
      });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: 'User already exists' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log('📥 Login Payload:', req.body); // Debug

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const emailLower = email.toLowerCase();

    // Check if MongoDB is connected
    if (isMongoConnected()) {
      // Use MongoDB
      const user = await User.findOne({ email: emailLower });
      if (!user) {
        console.log('❌ No user found for:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('❌ Password mismatch for:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      console.log('✅ Token issued (MongoDB) for:', email);
      res.json({ 
        token,
        user: {
          id: user._id,
          email: user.email
        }
      });
    } else {
      // Use in-memory storage
      const user = inMemoryUsers.get(emailLower);
      if (!user) {
        console.log('❌ No user found (in-memory) for:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('❌ Password mismatch (in-memory) for:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      console.log('✅ Token issued (in-memory) for:', email);
      res.json({ 
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    }

  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
