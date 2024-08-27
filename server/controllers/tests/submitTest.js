import SubmittedTest from '../../models/SubmittedTests.js';

const submitTest = async (req, res) => {
    try {
        const { test_id, user_id, questions, total_marks } = req.body;

        // Create a new submitted test entry
        const newSubmittedTest = new SubmittedTest({
            test_id,
            user_id,
            questions,
            total_marks
        });

        const savedTest = await newSubmittedTest.save();
        res.status(201).json({ message: 'Test results submitted successfully', data: savedTest });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting test results', error: error.message });
    }
};

export default submitTest;
