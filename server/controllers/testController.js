const Test = require('../models/Test');
const mongoose = require('mongoose');
const Course = require('../models/Course');

// Create a new test
exports.createTest = async (req, res) => {
    try {
        const { name, questions } = req.body;
        const test = new Test({ name, questions });
        await test.save();
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tests
exports.getAllTests = async (req, res) => {
    try {
        const results = await Test.aggregate([
            { $match: { is_deleted: false } },
            {
                $lookup: {
                    from: 'courses', // Ensure this matches your actual collection name
                    localField: '_id',
                    foreignField: 'tests',
                    as: 'course'
                }
            },
            { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } }
        ]);

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No tests found' });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single test by ID
exports.getTestById = async (req, res) => {
    try {
        const testId = mongoose.Types.ObjectId(req.params.id);

        const result = await Test.aggregate([
            { $match: { _id: testId, is_deleted: false } },
            {
                $lookup: {
                    from: 'courses', // Ensure this matches your actual collection name
                    localField: '_id',
                    foreignField: 'tests',
                    as: 'course'
                }
            },
            { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } }
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Test not found or no associated course' });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTestByCourseId = async (req, res) => {
    try {
        const courseId = mongoose.Types.ObjectId(req.params.id);

        // Find the course by ID
        const course = await Course.findOne({ _id: courseId, is_deleted: false });

        if (!course) {
            return res.status(404).json({ message: 'Course not found or is deleted' });
        }

        // Fetch all tests concurrently
        const testPromises = course.tests.map(testId =>
            Test.findOne({ _id: testId, is_deleted: false })
        );
        const tests = await Promise.all(testPromises);

        // Filter out any null or undefined results
        const validTests = tests.filter(test => test !== null && test !== undefined);

        if (validTests.length === 0) {
            return res.status(404).json({ message: 'No associated tests found or all tests are deleted' });
        }

        res.status(200).json(validTests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a test by ID
exports.updateTest = async (req, res) => {
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

// Delete a test by ID (soft delete)
exports.deleteTest = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        test.is_deleted = true;
        await test.save();
        res.status(200).json({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
