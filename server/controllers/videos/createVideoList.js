const VideosList = require('../../models/VideosList')


const createVideoList = async (req, res) => {
    try {
        const { videos } = req.body;
        const videoList = new VideosList({ videos });
        await videoList.save();
        res.status(201).json(videoList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = createVideoList