const Subject = require('../models/Subject');

// Create a new subject
exports.createSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.status(201).send(subject);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all subjects
exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({ is_deleted: false })
            .populate({
                path: 'classes',
                select: 'name' // Adjust fields as necessary based on your Class schema
            })
            .populate({
                path: 'teachers',
                select: 'firstName lastName' // Adjust fields as necessary based on your Teacher schema
            });

        res.status(200).send(subjects);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a subject by ID
exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).send();
        }
        res.status(200).send(subject);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a subject by ID
exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subject) {
            return res.status(404).send();
        }
        res.status(200).send(subject);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a subject by ID
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!subject) {
            return res.status(404).json({ error: 'subject not found' });
        }
        res.status(200).send(subject);
    } catch (error) {
        res.status(500).send(error);
    }
};
