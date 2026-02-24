const express = require('express'); 
const router = express.Router(); // Create router instance

// Import controller functions for handling notes
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/noteController');

// GET /api/notes → Get all notes
router.get('/', getNotes);

// POST /api/notes → Add a new note
router.post('/', addNote);

// PUT /api/notes/:id → Update a note by ID
router.put('/:id', updateNote);

// DELETE /api/notes/:id → Delete a note by ID
router.delete('/:id', deleteNote);

// Export the router so app.js can use it
module.exports = router;