const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Create a new student (registration)
exports.createStudent = async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth } = req.body;

    try {
        // Check if the student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student
        const student = new Student({
            firstName,
            lastName,
            email,
            password1: password,
            password: hashedPassword,
            dateOfBirth
        });

        await student.save();

        // Create a corresponding user
        const user = new User({
            firstName,
            lastName,
            email,
            password1: password,
            password: hashedPassword,
            userType: "Student",
            student_id: student._id,  // Linking the student's ObjectId
        });

        await user.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login student
exports.loginStudent = async (req, res) => {
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
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // console.log("Token in DB (server login call) is:", token);
        // Send success response with token
        res.status(200).json({ token, studentId: student._id });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find({ is_deleted: false })
            .populate({
                path: 'class',
                select: 'name' // Adjust fields as necessary based on your Class schema
            })
            .populate({
                path: 'enrollments',
                select: 'course dateEnrolled', // Adjust fields as necessary based on your Enrollment schema
                populate: {
                    path: 'course',
                    select: 'name' // Adjust fields as necessary based on your Course schema
                }
            });

        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send();
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).send();
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a student by ID (soft delete)
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};
