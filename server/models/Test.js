import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    questions: { type: Map, of: mongoose.Schema.Types.Mixed, required: true }, // Use Map with Mixed type for JSON
    description: String,
    duration: String,
    photo: String,
    language: { type: String },
    class: { type: String },
    startDate: { type: Date },
}, {
    timestamps: true
});

export default mongoose.model('Test', testSchema);
