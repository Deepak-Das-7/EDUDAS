const CourseContent = require('../../models/CourseContent');


const getCourseContentById = async (req, res) => {
    try {
        const courseContent = await CourseContent.findById(req.params.id).populate('practicePaperList');

        if (!courseContent) {
            return res.status(404).send({ message: 'Course content not found' });
        }
        res.status(200).send(courseContent);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching course content', error: error.message });
    }
};

module.exports = getCourseContentById;