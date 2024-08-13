const CourseContent = require('../models/CourseContent'); // Assuming CourseContent is your Mongoose model

// Create a new course content
exports.createCourseContent = async (req, res) => {
    try {
        const newCourseContent = new CourseContent(req.body);
        await newCourseContent.save();
        res.status(201).send(newCourseContent);
    } catch (error) {
        res.status(400).send({ message: 'Error creating course content', error: error.message });
    }
};

// Get all course contents
exports.getCourseContents = async (req, res) => {
    try {
        const courseContents = await CourseContent.find({ is_deleted: false });
        res.status(200).send(courseContents);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching course contents', error: error.message });
    }
};

// Get a course content by ID
exports.getCourseContentById = async (req, res) => {
    try {
        const courseContent = await CourseContent.findById(req.params.id);

        if (!courseContent) {
            return res.status(404).send({ message: 'Course content not found' });
        }
        res.status(200).send(courseContent);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching course content', error: error.message });
    }
};

// Update a course content by ID
exports.updateCourseContent = async (req, res) => {
    try {
        const courseContent = await CourseContent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!courseContent) {
            return res.status(404).send({ message: 'Course content not found' });
        }
        res.status(200).send(courseContent);
    } catch (error) {
        res.status(400).send({ message: 'Error updating course content', error: error.message });
    }
};

// Delete a course content by ID
exports.deleteCourseContent = async (req, res) => {
    try {
        const courseContent = await CourseContent.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );

        if (!courseContent) {
            return res.status(404).send({ message: 'Course content not found' });
        }
        res.status(200).send(courseContent);
    } catch (error) {
        res.status(500).send({ message: 'Error deleting course content', error: error.message });
    }
};
