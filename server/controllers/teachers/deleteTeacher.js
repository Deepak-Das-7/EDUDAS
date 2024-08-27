import Teacher from '../../models/Teacher.js';

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
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default deleteTeacher;
