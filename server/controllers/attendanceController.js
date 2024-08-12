const Attendance = require('../models/Attendance');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all attendance records
exports.getAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find({ is_deleted: false })
            .populate({
                path: 'student',
                select: 'firstName lastName'
            });

        res.status(200).send(attendances);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get an attendance record by ID
exports.getAttendanceRecordById = async (req, res) => {
    try {
        const record = await Attendance.findById(req.params.id);
        if (!record) {
            return res.status(404).send();
        }
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an attendance record by ID
exports.updateAttendanceRecord = async (req, res) => {
    try {
        const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!record) {
            return res.status(404).send();
        }
        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an attendance record by ID
exports.deleteAttendanceRecord = async (req, res) => {
    try {
        const record = await Attendance.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
};
