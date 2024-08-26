const User = require('../../models/User');
const Student = require('../../models/Student');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const createStudent = async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth } = req.body;
    // console.log("on getting ", firstName, lastName, email, password, dateOfBirth);
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
            password: hashedPassword,
            password1: password,
            dateOfBirth
        });

        await student.save();

        // Create a corresponding user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            password1: password,
            userType: "Student",
            student_id: student._id,  // Linking the student's ObjectId
        });

        await user.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = createStudent;