const Grade = require('../models/Grade');

// Create a new grade
exports.createGrade = async (req, res) => {
    try {
        const grade = new Grade(req.body);
        await grade.save();
        res.status(201).send(grade);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all grades
exports.getGrades = async (req, res) => {
    try {
        const grades = await Grade.find({ is_deleted: false })
            .populate({
                path: 'student',
                select: 'firstName lastName' // Adjust fields as necessary based on your Student schema
            })
            .populate({
                path: 'subject',
                select: 'name' // Adjust fields as necessary based on your Subject schema
            });

        res.status(200).send(grades);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Get a grade by ID
exports.getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade) {
            return res.status(404).send();
        }
        res.status(200).send(grade);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a grade by ID
exports.updateGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!grade) {
            return res.status(404).send();
        }
        res.status(200).send(grade);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a grade by ID
exports.deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!grade) {
            return res.status(404).json({ error: 'grade not found' });
        }
        res.status(200).send(grade);
    } catch (error) {
        res.status(500).send(error);
    }
};
