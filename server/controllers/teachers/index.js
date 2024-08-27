import express from 'express';
import createTeacher from './createTeacher.js';
import loginTeacher from './loginTeacher.js';
import getTeachers from './getTeachers.js';
import getTeacherById from './getTeacherById.js';
import updateTeacher from './updateTeacher.js';
import deleteTeacher from './deleteTeacher.js';

const TeacherRouter = express.Router();

TeacherRouter.post('/', createTeacher);
TeacherRouter.post('/login', loginTeacher);
TeacherRouter.get('/', getTeachers);
TeacherRouter.get('/:id', getTeacherById);
TeacherRouter.put('/:id', updateTeacher);
TeacherRouter.delete('/:id', deleteTeacher);

export default TeacherRouter;
