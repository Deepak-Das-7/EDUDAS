const Course = require('../../models/Course');


const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).sort({ createdAt: -1 });

        if (!course) {
            return res.status(404).send();
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getCourseById