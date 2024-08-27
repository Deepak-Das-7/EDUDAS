import Student from '../../models/Student.js';

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default getStudentById;
