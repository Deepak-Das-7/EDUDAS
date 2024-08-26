const Course = require('../../models/Course');


const updateCourseByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const course = await Course.findByIdAndUpdate({ students: userId }, req.body, { new: true, runValidators: true });
        if (!course) {
            return res.status(404).send();
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = updateCourseByUserId