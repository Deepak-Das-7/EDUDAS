const Test = require('../../models/Test');


const createTest = async (req, res) => {
    try {
        const { name, questions } = req.body;
        const test = new Test({ name, questions });
        await test.save();
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = createTest