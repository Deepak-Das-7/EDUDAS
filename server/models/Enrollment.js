const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    dateEnrolled: { type: Date, default: Date.now }
}, {
    timestamps: true
});
module.exports = mongoose.model('Enrollment', enrollmentSchema);
