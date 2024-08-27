import Student from '../../models/Student.js';

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default deleteStudent;
