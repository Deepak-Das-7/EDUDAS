import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    questions: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
    description: { type: String, default: '' },
    duration: { type: String, default: '' },
    photo: { type: String, default: '' },
    language: { type: String, default: '' },
    class: { type: String, default: '' },
    startDate: { type: Date, default: new Date() },
}, {
    timestamps: true
});

export default mongoose.model('Test', testSchema);