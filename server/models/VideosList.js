const mongoose = require('mongoose');

const videosList = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    videos: { type: String },
    description: String,
    duration: String,
    photo: String,
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
    class: { type: String }, // Class or level of the course
    isFree: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    startDate: { type: Date }, // Start date of the course
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseContent' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('VideosList', videosListSchema);
