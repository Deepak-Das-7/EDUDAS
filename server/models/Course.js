import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    duration: { type: String, default: '' },
    photo: { type: String, default: '' },
    language: { type: String, default: '' },
    class: { type: String, default: '' },
    isFree: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    startDate: { type: Date, default: new Date() },
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseContent' },
    videos: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoList' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: [] }],
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test', default: [] }],
}, {
    timestamps: true
});

export default mongoose.model('Course', courseSchema);
