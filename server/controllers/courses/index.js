const express = require('express');

const getCourse = require('./getCourse');
const addCourse = require('./addCourse');
const getCourseById = require('./getCourseById');
const updateCourseByID = require('./updateCourseByID');
const deleteCourse = require('./deleteCourse');
const addCourseByUserId = require('./addCourseByUserId');
const getCourseByUserId = require('./getCourseByUserId');
const updateCourseByUserId = require('./updateCourseByUserId');
const getOtherCourseByUserId = require('./getOtherCourseByUserId');

const CourseRouter = express.Router();

CourseRouter.post('/', addCourse);
CourseRouter.get('/', getCourse);
CourseRouter.get('/:id', getCourseById);
CourseRouter.put('/:id', updateCourseByID);
CourseRouter.delete('/:id', deleteCourse);
CourseRouter.post('/add/:user_id/:course_id', addCourseByUserId);
CourseRouter.get('/user/:id', getCourseByUserId);
CourseRouter.put('/user/:id', updateCourseByUserId);
CourseRouter.get('/exceptuser/:id', getOtherCourseByUserId);

module.exports = CourseRouter;
