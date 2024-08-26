const Teacher = require('../../models/Teacher');


const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({ is_deleted: false })
            .populate({
                path: 'subjects',
                select: 'name' // Adjust fields as necessary based on your Subject schema
            });

        res.status(200).send(teachers);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = getTeachers