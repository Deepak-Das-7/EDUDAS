const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);
