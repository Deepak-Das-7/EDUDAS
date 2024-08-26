const express = require('express');

const CourseRouter = require('./courses');
const CourseContentRouter = require('./courseContent');
const PracticePaperRouter = require('./practicePaper');
const StudentRouter = require('./students');
const TeacherRouter = require('./teachers');
const TestRouter = require('./tests');
const VideoRouter = require('./videos');

const ApiRouter = express.Router(); // Declare the router

// Define routes
ApiRouter.use("/courses", CourseRouter);
ApiRouter.use("/courseContent", CourseContentRouter);
ApiRouter.use("/practice-papers", PracticePaperRouter);
ApiRouter.use("/students", StudentRouter);
ApiRouter.use("/teachers", TeacherRouter);
ApiRouter.use("/tests", TestRouter);
ApiRouter.use("/videos", VideoRouter);

module.exports = ApiRouter;
