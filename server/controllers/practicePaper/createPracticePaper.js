import PracticePaper from '../../models/PracticePaper.js';


const createPracticePaper = async (req, res) => {
    try {
        const { ...rest } = req.body;
        const practicePaper = new PracticePaper({ ...rest });
        await practicePaper.save();
        res.status(201).json(practicePaper);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send(error);
    }
};

export default createPracticePaper;