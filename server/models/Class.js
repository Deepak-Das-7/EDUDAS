const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true, unique: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
