const PracticePaper = require('../models/PracticePaper');

// Create a new practice paper
exports.createPracticePaper = async (req, res) => {
    try {
        const practicePaper = new PracticePaper(req.body);
        await practicePaper.save();
        res.status(201).json(practicePaper);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all practice papers
exports.getAllPracticePapers = async (req, res) => {
    try {
        const practicePapers = await PracticePaper.find();
        res.status(200).json(practicePapers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a practice paper by ID
exports.updatePracticePaper = async (req, res) => {
    try {
        const { id } = req.params;
        const practicePaper = await PracticePaper.findByIdAndUpdate(id, req.body, { new: true });
        if (!practicePaper) {
            return res.status(404).json({ message: 'Practice paper not found' });
        }
        res.status(200).json(practicePaper);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single practice paper by ID
exports.getPracticePaperById = async (req, res) => {
    try {
        const { id } = req.params;
        const practicePaper = await PracticePaper.findById(id);
        if (!practicePaper) {
            return res.status(404).json({ message: 'Practice paper not found' });
        }
        res.status(200).json(practicePaper);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a practice paper by ID
exports.deletePracticePaper = async (req, res) => {
    try {
        const { id } = req.params;
        const practicePaper = await PracticePaper.findByIdAndDelete(id);
        if (!practicePaper) {
            return res.status(404).json({ message: 'Practice paper not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
