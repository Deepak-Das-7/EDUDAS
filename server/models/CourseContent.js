const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    theoryPdf: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('CourseContent', courseContentSchema);
