const PracticePaper = require('../../models/PracticePaper');


const createPracticePaper = async (req, res) => {
    try {
        const practicePaper = new PracticePaper(req.body);
        await practicePaper.save();
        res.status(201).json(practicePaper);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = createPracticePaper;