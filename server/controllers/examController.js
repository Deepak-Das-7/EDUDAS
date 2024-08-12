const Exam = require('../models/Exam');

// Create a new exam
exports.createExam = async (req, res) => {
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).send(exam);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all exams
exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find({ is_deleted: false })
            .populate({
                path: 'subject',
                select: 'name' // Adjust fields as necessary based on your Subject schema
            })
            .populate({
                path: 'class',
                select: 'name' // Adjust fields as necessary based on your Class schema
            });

        res.status(200).send(exams);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get an exam by ID
exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).send();
        }
        res.status(200).send(exam);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an exam by ID
exports.updateExam = async (req, res) => {
    try {
        const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!exam) {
            return res.status(404).send();
        }
        res.status(200).send(exam);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an exam by ID
exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!exam) {
            return res.status(404).json({ error: 'exam not found' });
        }
        res.status(200).send(exam);
    } catch (error) {
        res.status(500).send(error);
    }
};
