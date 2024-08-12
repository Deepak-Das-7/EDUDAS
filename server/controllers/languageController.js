const Language = require('../models/Language');

// Create a new language
exports.createLanguage = async (req, res) => {
    try {
        const language = new Language(req.body);
        await language.save();
        res.status(201).send(language);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all languages
exports.getLanguages = async (req, res) => {
    try {
        const languages = await Language.find();
        res.status(200).send(languages);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a language by ID
exports.getLanguageById = async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (!language) {
            return res.status(404).send();
        }
        res.status(200).send(language);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a language by ID
exports.updateLanguageById = async (req, res) => {
    try {
        const language = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!language) {
            return res.status(404).send();
        }
        res.status(200).send(language);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a language by ID
exports.deleteLanguage = async (req, res) => {
    try {
        const language = await Language.findByIdAndDelete(req.params.id);
        if (!language) {
            return res.status(404).json({ error: 'Language not found' });
        }
        res.status(200).send(language);
    } catch (error) {
        res.status(500).send(error);
    }
};
