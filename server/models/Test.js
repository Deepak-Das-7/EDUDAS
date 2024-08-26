const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    questions: { type: JSON, required: true },
    description: String,
    duration: String,
    photo: String,
    language: { type: String },
    class: { type: String },
    startDate: { type: Date },
}, {
    timestamps: true
});

module.exports = mongoose.model('Test', testSchema);