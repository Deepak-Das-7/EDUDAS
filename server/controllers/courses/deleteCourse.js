const Course = require('../../models/Course');


const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!course) {
            return res.status(404).json({ error: 'course not found' });
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = deleteCourse