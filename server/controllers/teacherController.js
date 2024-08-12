const Teacher = require('../models/Teacher');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Create a new teacher (registration)
exports.createTeacher = async (req, res) => {
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
            password: hashedPassword,
        });
        await teacher.save();

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType: "Teacher",
            teacher_id: teacher._id,
        });

        await user.save();
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login teacher
exports.loginTeacher = async (req, res) => {
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

// Get all teachers
exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({ is_deleted: false })
            .populate({
                path: 'subjects',
                select: 'name' // Adjust fields as necessary based on your Subject schema
            });

        res.status(200).send(teachers);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a teacher by ID
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).send();
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a teacher by ID
exports.updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!teacher) {
            return res.status(404).send();
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a teacher by ID (soft delete)
exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
};
