const Teacher = require('../../models/Teacher');

const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).send();
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = getTeacherById