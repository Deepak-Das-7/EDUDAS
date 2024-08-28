import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password1: { type: String },
    lastName: { type: String, required: true },
    dateOfBirth: Date,
    lastLogin: Date,
    class: { type: String },
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }]
}, {
    timestamps: true
});

export default mongoose.model('Student', studentSchema);
