import Course from '../../models/Course.js';

const updateCourseByID = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, req.body, {
            new: true,           // Return the updated document
            runValidators: true, // Validate before updating
            context: 'query'     // Set the context to 'query' for validation
        });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json(course);
    } catch (error) {
        return res.status(400).json({
            error: 'Bad Request',
            message: error.message,
        });
    }
};

export default updateCourseByID;
