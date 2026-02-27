const Note = require('../models/noteModel');

// GET notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    const formattedNotes = notes.map(note => ({
      id: note._id.toString(),
      userID: note.userID,
      title: note.title,
      content: note.content,
      isPinned: note.isPinned,
      isArchived: note.isArchived,
      priority: note.priority,
      attachments: note.attachments,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    }));

    res.json(formattedNotes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notes" });
  }
};

const addNote = async (req, res) => {
  try {
    const { title, content, priority, isPinned, isArchived, attachments } = req.body;

    const note = new Note({
      userID: "000000000000000000000000", // temp fake user
      title,
      content,
      priority: priority || "normal",
      isPinned: isPinned || false,
      isArchived: isArchived || false,
      attachments: attachments || []
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE note
const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({
      ...updatedNote.toObject(),
      id: updatedNote._id.toString() // make sure frontend can use `id`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating note" });
  }
};

// DELETE note
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting note" });
  }
};

module.exports = { getNotes, addNote, updateNote, deleteNote };