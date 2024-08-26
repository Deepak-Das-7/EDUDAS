const Student = require('../../models/Student');
const dotenv = require('dotenv');
dotenv.config();

const getStudents = async (req, res) => {
    try {
        const students = await Student.find({ is_deleted: false })
            .populate({
                path: 'class',
                select: 'name' // Adjust fields as necessary based on your Class schema
            })
            .populate({
                path: 'enrollments',
                select: 'course dateEnrolled', // Adjust fields as necessary based on your Enrollment schema
                populate: {
                    path: 'course',
                    select: 'name' // Adjust fields as necessary based on your Course schema
                }
            });

        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = getStudents