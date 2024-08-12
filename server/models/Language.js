const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the language
    code: { type: String, required: true }, // Language code (e.g., 'en', 'fr')
    description: String
}, {
    timestamps: true
});
module.exports = mongoose.model('Language', languageSchema);
