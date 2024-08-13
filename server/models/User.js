const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password1: { type: String },
    lastName: { type: String, required: true },
    userType: { type: String, required: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);
