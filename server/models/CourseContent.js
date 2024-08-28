import mongoose from 'mongoose';

const courseContentSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    topic: { type: String, required: true },
    theoryPdf: { type: String, default: '' },
    practicePaperList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PracticePaper', default: [] }],
    funFacts: [{ type: String, default: [] }],
}, {
    timestamps: true
});

export default mongoose.model('CourseContent', courseContentSchema);