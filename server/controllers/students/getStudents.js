import Student from '../../models/Student.js';

const getStudents = async (req, res) => {
    try {
        const students = await Student.find({ is_deleted: false });

        res.status(200).send(students);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default getStudents;
