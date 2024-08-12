const Class = require('../models/Class');

// Create a new class
exports.createClass = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).send(newClass);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all classes
exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({ is_deleted: false })
            .populate({
                path: 'students',
                select: 'firstName lastName' // Adjust fields as necessary
            })
            .populate({
                path: 'teachers',
                select: 'firstName lastName' // Adjust fields as necessary
            });

        res.status(200).send(classes);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a class by ID
exports.getClassById = async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id);
        if (!classData) {
            return res.status(404).send();
        }
        res.status(200).send(classData);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a class by ID
exports.updateClass = async (req, res) => {
    try {
        const classData = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!classData) {
            return res.status(404).send();
        }
        res.status(200).send(classData);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
    try {
        const classData = await Class.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!classData) {
            return res.status(404).json({ error: 'classData not found' });
        }
        res.status(200).send(classData);
    } catch (error) {
        res.status(500).send(error);
    }
};
