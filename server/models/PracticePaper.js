const mongoose = require('mongoose');

const practicePaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('PracticePaper', practicePaperSchema);
