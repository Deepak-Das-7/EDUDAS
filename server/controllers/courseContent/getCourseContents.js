const CourseContent = require('../../models/CourseContent');


const getCourseContents = async (req, res) => {
    try {
        const courseContents = await CourseContent.find({ is_deleted: false });
        res.status(200).send(courseContents);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching course contents', error: error.message });
    }
};


module.exports = getCourseContents;
