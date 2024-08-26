const express = require('express');

const createTeacher = require('./createTeacher');
const loginTeacher = require('./loginTeacher');
const getTeachers = require('./getTeachers');
const getTeacherById = require('./getTeacherById');
const updateTeacher = require('./updateTeacher');
const deleteTeacher = require('./deleteTeacher');

const TeacherRouter = express.Router();

TeacherRouter.post('/', createTeacher);
TeacherRouter.post('/login', loginTeacher);
TeacherRouter.get('/', getTeachers);
TeacherRouter.get('/:id', getTeacherById);
TeacherRouter.put('/:id', updateTeacher);
TeacherRouter.delete('/:id', deleteTeacher);

module.exports = TeacherRouter;
