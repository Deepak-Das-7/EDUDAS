import Teacher from '../../models/Teacher.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

const createTeacher = async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth } = req.body;

    try {
        // Check if the teacher already exists
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new teacher
        const teacher = new Teacher({
            firstName,
            lastName,
            email,
            dateOfBirth,
            password1: password,
            password: hashedPassword,
        });
        await teacher.save();

        const user = new User({
            firstName,
            lastName,
            email,
            password1: password,
            password: hashedPassword,
            userType: 'Teacher',
            teacher_id: teacher._id,
        });

        await user.save();
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default createTeacher;
