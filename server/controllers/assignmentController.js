const Assignment = require('../models/Assignment');

// Create a new assignment
exports.createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment(req.body);
        await assignment.save();
        res.status(201).send(assignment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all assignments
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ is_deleted: false })
            .populate({
                path: 'class',
                select: 'name'
            })
            .populate({
                path: 'students',
                select: 'firstName lastName'
            });

        res.status(200).send(assignments);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get an assignment by ID
exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).send();
        }
        res.status(200).send(assignment);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an assignment by ID
exports.updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!assignment) {
            return res.status(404).send();
        }
        res.status(200).send(assignment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an assignment by ID
exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment marked as deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
