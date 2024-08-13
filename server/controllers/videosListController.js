const VideosList = require('../models/VideosList')
const mongoose = require('mongoose');

// Create a new video list entry
exports.createVideoList = async (req, res) => {
    try {
        const { videos } = req.body;
        const videoList = new VideosList({ videos });
        await videoList.save();
        res.status(201).json(videoList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all video list entries
exports.getAllVideoLists = async (req, res) => {
    try {
        const videoLists = await VideosList.find({ is_deleted: false });
        if (videoLists.length === 0) {
            return res.status(404).json({ message: 'No video lists found' });
        }
        res.status(200).json(videoLists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single video list entry by ID
exports.getVideoListById = async (req, res) => {
    try {
        const videoListId = mongoose.Types.ObjectId(req.params.id);
        const videoList = await VideosList.findOne({ _id: videoListId, is_deleted: false });
        if (!videoList) {
            return res.status(404).json({ message: 'Video list not found' });
        }
        res.status(200).json(videoList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a video list entry by ID
exports.updateVideoList = async (req, res) => {
    try {
        const { videos } = req.body;
        const videoList = await VideosList.findByIdAndUpdate(
            req.params.id,
            { videos },
            { new: true, runValidators: true }
        );
        if (!videoList || videoList.is_deleted) {
            return res.status(404).json({ message: 'Video list not found' });
        }
        res.status(200).json(videoList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a video list entry by ID (soft delete)
exports.deleteVideoList = async (req, res) => {
    try {
        const videoList = await VideosList.findById(req.params.id);
        if (!videoList) {
            return res.status(404).json({ message: 'Video list not found' });
        }
        videoList.is_deleted = true;
        await videoList.save();
        res.status(200).json({ message: 'Video list deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
