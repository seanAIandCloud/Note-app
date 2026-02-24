const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // for hashing passwords
const jwt = require('jsonwebtoken'); // optional: for login tokens

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect password' });

    // optional: generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };