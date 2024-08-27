import Teacher from '../../models/Teacher.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const loginTeacher = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the teacher by email
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Compare the provided password with the stored password
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update the last login date
        teacher.lastLogin = Date.now();
        await teacher.save(); // Save the updated teacher record

        // Generate a token
        const token = jwt.sign(
            {
                id: teacher._id,
                firstName: teacher.firstName,
                email: teacher.email,
                lastName: teacher.lastName,
                type: 'teacher'
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response with token
        res.status(200).json({ token, teacherId: teacher._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export default loginTeacher;
