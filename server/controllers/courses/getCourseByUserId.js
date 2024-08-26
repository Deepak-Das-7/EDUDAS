const Course = require('../../models/Course');


const getCourseByUserId = async (req, res) => {
    try {
        const courses = await Course.find({ students: req.params.id }).populate({
            path: 'students',
            select: 'firstName lastName'
        }).sort({ createdAt: -1 });

        // console.log("Courses found:", courses);

        if (!courses || courses.length === 0) {
            // console.log("No courses found for this user.");
            return res.status(404).send({ message: 'No courses found for this user.' });
        }
        res.status(200).send(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send(error);
    }
}

module.exports = getCourseByUserId