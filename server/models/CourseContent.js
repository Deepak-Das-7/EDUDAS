const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    topic: { type: String, required: true },
    theoryPdf: { type: String },
    practicePaperList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PracticePaper' }],
    funFacts: [{ type: String }],
}, {
    timestamps: true
});

module.exports = mongoose.model('CourseContent', courseContentSchema);
