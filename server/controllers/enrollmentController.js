const Enrollment = require('../models/Enrollment');

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
    try {
        const enrollment = new Enrollment(req.body);
        await enrollment.save();
        res.status(201).send(enrollment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all enrollments
exports.getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ is_deleted: false })
            .populate({
                path: 'student',
                select: 'firstName lastName' // Adjust fields as necessary
            })
            .populate({
                path: 'course',
                select: 'name description' // Adjust fields as necessary
            });

        res.status(200).send(enrollments);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get an enrollment by ID
exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) {
            return res.status(404).send();
        }
        res.status(200).send(enrollment);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an enrollment by ID
exports.updateEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!enrollment) {
            return res.status(404).send();
        }
        res.status(200).send(enrollment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an enrollment by ID
exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!enrollment) {
            return res.status(404).json({ error: 'enrollment not found' });
        }
        res.status(200).send(enrollment);
    } catch (error) {
        res.status500.send(error);
    }
};
