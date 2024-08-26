const Course = require('../../models/Course');


const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate({
            path: 'subjects',
            select: 'name' // Adjust fields as necessary
        })
            .populate({
                path: 'language', // This should match the field name in the Course schema
                select: 'name code' // Adjust fields as necessary
            }).sort({ createdAt: -1 });

        if (!course) {
            return res.status(404).send();
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getCourseById