const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password1: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    lastLogin: Date,
    dateOfBirth: Date,
}, {
    timestamps: true // adds createdAt and updatedAt fields
});


module.exports = mongoose.model('Teacher', teacherSchema);
