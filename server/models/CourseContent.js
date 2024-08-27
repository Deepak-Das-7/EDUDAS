import mongoose from 'mongoose';

const courseContentSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    topic: { type: String, required: true },
    theoryPdf: { type: String },
    practicePaperList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PracticePaper' }],
    funFacts: [{ type: String }],
}, {
    timestamps: true
});

export default mongoose.model('CourseContent', courseContentSchema);
