const mongoose = require('mongoose');

const submitted_testSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questions: { type: JSON, required: true },
    total_marks: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('submitted_test', submitted_testSchema);