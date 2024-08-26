const Course = require('../../models/Course'); // Assuming CourseContent is your Mongoose model


const getCourse = async (req, res) => {
    try {
        const courses = await Course.find({ is_deleted: false }).sort({ startDate: -1 });
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getCourse