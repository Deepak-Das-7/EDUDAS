const Course = require('../models/Course');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ is_deleted: false })
            .populate({
                path: 'subjects',
                select: 'name' // Adjust fields as necessary
            })
            .populate({
                path: 'language', // This should match the field name in the Course schema
                select: 'name code' // Adjust fields as necessary
            });
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Get a course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate({
            path: 'subjects',
            select: 'name' // Adjust fields as necessary
        })
            .populate({
                path: 'language', // This should match the field name in the Course schema
                select: 'name code' // Adjust fields as necessary
            });

        if (!course) {
            return res.status(404).send();
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(500).send(error);
    }
};



// Update a course by ID
exports.updateCourseByID = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!course) {
            return res.status(404).send();
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a course by UserID
exports.getCourseByUserId = async (req, res) => {
    try {
        const courses = await Course.find({ students: req.params.id }).populate({
            path: 'students',
            select: 'firstName lastName'
        });

        // console.log("Courses found:", courses);

        if (!courses || courses.length === 0) {
            console.log("No courses found for this user.");
            return res.status(404).send({ message: 'No courses found for this user.' });
        }
        res.status(200).send(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send(error);
    }
};

//Update course by UserId
exports.updateCourseByUserId = async (req, res) => {
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
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
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
};
