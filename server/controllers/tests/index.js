const express = require('express');

const createTest = require('./createTest');
const getAllTests = require('./getAllTests');
const getTestById = require('./getTestById');
const updateTest = require('./updateTest');
const deleteTest = require('./deleteTest');
const getTestByCourseId = require('./getTestByCourseId');

const submitTest = require('./submitTest');
const getAllSubmittedTests = require('./getAllSubmittedTests');
const getSubmittedTestByUserIdAndTestID = require('./getSubmittedTestByUserIdAndTestID');
const getSubmittedTestById = require('./getSubmittedTestById');
const getSubmittedTestByUserId = require('./getSubmittedTestByUserId');
const updateSubmittedTestById = require('./updateSubmittedTestById');
const deleteSubmittedTestById = require('./deleteSubmittedTestById');

const TestRouter = express.Router();

TestRouter.post('/', createTest);
TestRouter.get('/', getAllTests);
TestRouter.get('/:id', getTestById);
TestRouter.put('/:id', updateTest);
TestRouter.delete('/:id', deleteTest);
TestRouter.get('/course/:id', getTestByCourseId);

TestRouter.post('/submit', submitTest);
TestRouter.get('/submit', getAllSubmittedTests);
TestRouter.get('/submit/:user_id/:test_id', getSubmittedTestByUserIdAndTestID);
TestRouter.get('/submit/:id', getSubmittedTestById);
TestRouter.put('/submit/:id', updateSubmittedTestById);
TestRouter.get('/submit/user/:id', getSubmittedTestByUserId);
TestRouter.delete('/submit/:id', deleteSubmittedTestById);

module.exports = TestRouter;
