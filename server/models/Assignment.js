const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    title: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);
