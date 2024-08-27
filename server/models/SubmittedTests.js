import mongoose from 'mongoose';

const submittedTestSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questions: { type: Map, of: mongoose.Schema.Types.Mixed, required: true }, // Use Map with Mixed type for JSON
    total_marks: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model('SubmittedTest', submittedTestSchema);
