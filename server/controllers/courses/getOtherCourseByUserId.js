const Course = require('../../models/Course');


const getOtherCourseByUserId = async (req, res) => {
    try {
        const courses = await Course.find({ students: { $nin: [req.params.id] } }).populate({
            path: 'students',
            select: 'firstName lastName'
        }).sort({ startDate: -1 });

        if (!courses || courses.length === 0) {
            // console.log("all courses found for this user.");
            return res.status(404).send({ message: 'all courses found for this user.' });
        }
        res.status(200).send(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send(error);
    }
}

module.exports = getOtherCourseByUserId