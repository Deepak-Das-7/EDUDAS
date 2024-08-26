const express = require('express');

const createVideoList = require('./createVideoList');
const getAllVideoLists = require('./getAllVideoLists');
const updateVideoList = require('./updateVideoList');
const getVideoListById = require('./getVideoListById');
const deleteVideoList = require('./deleteVideoList');

const VideoRouter = express.Router();

VideoRouter.post('/', createVideoList);
VideoRouter.get('/', getAllVideoLists);
VideoRouter.put('/:id', updateVideoList);
VideoRouter.get('/:id', getVideoListById);
VideoRouter.delete('/:id', deleteVideoList);

module.exports = VideoRouter;
