const express = require('express');

const createStudent = require('./createStudent');
const loginStudent = require('./loginStudent');
const getStudents = require('./getStudents');
const getStudentById = require('./getStudentById');
const updateStudent = require('./updateStudent');
const deleteStudent = require('./deleteStudent');

const StudentRouter = express.Router();

StudentRouter.post('/', createStudent);
StudentRouter.post('/login', loginStudent);
StudentRouter.get('/', getStudents);
StudentRouter.get('/:id', getStudentById);
StudentRouter.put('/:id', updateStudent);
StudentRouter.delete('/:id', deleteStudent);

module.exports = StudentRouter;
