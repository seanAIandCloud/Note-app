const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  fileUrl: String,        // file URL
  fileType: String,       // file type
  uploadedAt: { type: Date, default: Date.now } // uploaded date
});

const noteSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // user
  title: { type: String, required: true },  // title
  content: { type: String, required: true }, // content
  isPinned: { type: Boolean, default: false }, // pinned?
  isArchived: { type: Boolean, default: false }, // archived?
  priority: { type: String, enum: ['urgent', 'done', 'normal'], default: 'normal' }, // priority
  attachments: [attachmentSchema], // attachments
}, { timestamps: true }); // createdAt/updatedAt

module.exports = mongoose.model('Note', noteSchema);