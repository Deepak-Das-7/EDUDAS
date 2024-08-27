import mongoose from 'mongoose';

const practicePaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model('PracticePaper', practicePaperSchema);
