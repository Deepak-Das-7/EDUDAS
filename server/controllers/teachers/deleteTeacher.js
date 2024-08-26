const Teacher = require('../../models/Teacher');


const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = deleteTeacher