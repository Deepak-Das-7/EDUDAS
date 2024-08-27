import Teacher from '../../models/Teacher.js';

const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({ is_deleted: false });
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getTeachers;
