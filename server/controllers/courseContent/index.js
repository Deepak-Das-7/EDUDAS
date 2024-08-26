const express = require('express');

const createCourseContent = require('./createCourseContent');
const getCourseContents = require('./getCourseContents');
const getCourseContentById = require('./getCourseContentById');
const updateCourseContent = require('./updateCourseContent');
const deleteCourseContent = require('./deleteCourseContent');

const CourseContentRouter = express.Router();

CourseContentRouter.post('/', createCourseContent);
CourseContentRouter.get('/', getCourseContents);
CourseContentRouter.get('/:id', getCourseContentById);
CourseContentRouter.put('/:id', updateCourseContent);
CourseContentRouter.delete('/:id', deleteCourseContent);

module.exports = CourseContentRouter;
