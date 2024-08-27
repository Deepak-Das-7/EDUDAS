import Student from '../../models/Student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        student.lastLogin = Date.now();
        await student.save();

        // Generate a token
        const token = jwt.sign(
            {
                id: student._id,
                firstName: student.firstName,
                email: student.email,
                lastName: student.lastName,
                type: "student"
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response with token
        res.status(200).json({ token, studentId: student._id });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default loginStudent;
