const mongoose = require('mongoose');       // Import Mongoose
require('dotenv').config();                  // Load .env

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connect using URI from .env
    console.log('MongoDB Atlas Connected');       // Success message
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message); // Error message
    process.exit(1);                                 // Exit if connection fails
  }
};

module.exports = connectDB; 