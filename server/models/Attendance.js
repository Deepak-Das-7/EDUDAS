const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    date: { type: Date, required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { type: String, required: true } // e.g., "Present", "Absent"
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
