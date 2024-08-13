const SubmittedTest = require('../models/SubmittedTests');
const mongoose = require('mongoose')

// Create a new submitted test
exports.createSubmittedTest = async (req, res) => {
    try {
        const { test_id, user_id, questions, total_marks } = req.body;

        const newSubmittedTest = new SubmittedTest({
            test_id,
            user_id,
            questions,
            total_marks
        });

        const savedTest = await newSubmittedTest.save();
        res.status(201).json({ message: 'Submitted test created successfully', data: savedTest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating submitted test', error });
    }
};
//submit tests
exports.submitTest = async (req, res) => {
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
        res.status(500).json({ message: 'Error submitting test results', error });
    }
};

// Get all submitted tests
exports.getAllSubmittedTests = async (req, res) => {
    try {
        const submittedTests = await SubmittedTest.find().populate('test_id').populate('user_id');
        res.status(200).json(submittedTests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submitted tests', error });
    }
};

// Get a specific submitted test by ID
exports.getSubmittedTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const submittedTest = await SubmittedTest.findById(id).populate('test_id').populate('user_id');

        if (!submittedTest) {
            return res.status(404).json({ message: 'Submitted test not found' });
        }

        res.status(200).json(submittedTest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submitted test', error });
    }
};
//for any user
exports.getSubmittedTestByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the provided ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Fetch submitted tests for the given user ID
        const submittedTests = await SubmittedTest.find({ user_id: id, is_deleted: false });

        if (!submittedTests || submittedTests.length === 0) {
            return res.status(404).json({ message: 'No submitted tests found for this user' });
        }

        // Return the fetched data
        res.status(200).json(submittedTests);
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({ message: 'Error fetching submitted tests', error: error.message });
    }
};

// Get a specific submitted test by ID UserIdAndTestID
exports.getSubmittedTestByUserIdAndTestID = async (req, res) => {
    try {
        const { user_id, test_id } = req.params;
        // Find the submitted test by user_id and test_id
        const submittedTest = await SubmittedTest.findOne({ user_id, test_id })
            .populate('test_id')
            .populate('user_id');

        if (!submittedTest) {
            return res.status(404).json({ message: 'Submitted test not found' });
        }
        res.status(200).json(submittedTest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submitted test', error });
    }
};

// Update a specific submitted test by ID
exports.updateSubmittedTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedSubmittedTest = await SubmittedTest.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedSubmittedTest) {
            return res.status(404).json({ message: 'Submitted test not found' });
        }

        res.status(200).json({ message: 'Submitted test updated successfully', data: updatedSubmittedTest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating submitted test', error });
    }
};

// Delete a specific submitted test by ID
exports.deleteSubmittedTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubmittedTest = await SubmittedTest.findByIdAndDelete(id);

        if (!deletedSubmittedTest) {
            return res.status(404).json({ message: 'Submitted test not found' });
        }

        res.status(200).json({ message: 'Submitted test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting submitted test', error });
    }
};
