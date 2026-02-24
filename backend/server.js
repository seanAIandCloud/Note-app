// Import the Express app from app.js
const app = require('./app');

// Load environment variables from the .env file
require('dotenv').config();

// Get the PORT number from the environment or use 3000 as default
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log to console when server is running
});