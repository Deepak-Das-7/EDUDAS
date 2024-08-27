import PracticePaper from '../../models/PracticePaper.js';


const createPracticePaper = async (req, res) => {
    try {
        const practicePaper = new PracticePaper(req.body);
        await practicePaper.save();
        res.status(201).json(practicePaper);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default createPracticePaper;