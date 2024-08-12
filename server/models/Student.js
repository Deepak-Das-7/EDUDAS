const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: Date,
    lastLogin: Date,
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }]
}, {
    timestamps: true // adds createdAt and updatedAt fields
});


module.exports = mongoose.model('Student', studentSchema);
