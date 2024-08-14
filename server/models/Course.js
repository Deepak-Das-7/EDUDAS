const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    courseName: { type: String },
    description: String,
    duration: String,
    photo: String,
    language: { type: String },
    class: { type: String }, // Class or level of the course
    isFree: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    startDate: { type: Date }, // Start date of the course
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseContent' },
    videos: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoList' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
