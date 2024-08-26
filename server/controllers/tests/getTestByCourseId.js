
const mongoose = require('mongoose');
const Course = require('../../models/Course');


const getTestByCourseId = async (req, res) => {
    try {
        const courseId = mongoose.Types.ObjectId(req.params.id);

        const course = await Course.findById(courseId)
            .populate({
                path: 'tests',
                match: { is_deleted: false } // Filter out deleted tests
            }).sort({ createdAt: -1 });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = getTestByCourseId