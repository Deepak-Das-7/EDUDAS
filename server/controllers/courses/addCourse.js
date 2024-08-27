import Course from '../../models/Course.js';


const addCourse = async (req, res) => {
    try {
        // console.log('Request Body:', req.body);
        const { startDate, price, ...rest } = req.body;
        const course = new Course({
            ...rest,
            startDate: new Date(startDate.date),
            price: Number(price)
        });

        await course.save();
        res.status(201).send(course);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send(error);
    }
};

export default addCourse;

