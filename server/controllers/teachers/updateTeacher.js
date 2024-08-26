const Teacher = require('../../models/Teacher');


const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!teacher) {
            return res.status(404).send();
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = updateTeacher