const express = require('express');

const createPracticePaper = require('./createPracticePaper');
const getAllPracticePapers = require('./getAllPracticePapers');
const updatePracticePaper = require('./updatePracticePaper');
const getPracticePaperById = require('./getPracticePaperById');
const deletePracticePaper = require('./deletePracticePaper');

const PracticePaperRouter = express.Router();

PracticePaperRouter.post('/', createPracticePaper);
PracticePaperRouter.get('/', getAllPracticePapers);
PracticePaperRouter.put('/:id', updatePracticePaper);
PracticePaperRouter.get('/:id', getPracticePaperById);
PracticePaperRouter.delete('/:id', deletePracticePaper);

module.exports = PracticePaperRouter;
