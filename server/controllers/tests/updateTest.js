const Test = require('../../models/Test');


const updateTest = async (req, res) => {
    try {
        const { name, questions } = req.body;
        const test = await Test.findByIdAndUpdate(
            req.params.id,
            { name, questions },
            { new: true, runValidators: true }
        );
        if (!test || test.is_deleted) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.status(200).json(test);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = updateTest