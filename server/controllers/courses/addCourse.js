import Course from '../../models/Course.js';
import Doubt from '../../models/Doubt.js';

const addCourse = async (req, res) => {

    try {
        const { classLevel, ...rest } = req.body;
        const newDoubt = new Doubt({
            class: classLevel,
        });
        await newDoubt.save();

        const course = new Course({
            ...rest,
            class: classLevel,
            doubt: newDoubt._id
        });

        await course.save();

        newDoubt.course_id = course._id;
        await newDoubt.save();

        res.status(201).send(course);
    } catch (error) {
        // console.error('Error creating coursesss:', error.message || error);
        res.status(400).send({ error: 'Error creating course' });
    }
};




export default addCourse;
