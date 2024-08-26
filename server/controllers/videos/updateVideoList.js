const VideosList = require('../../models/VideosList')


const updateVideoList = async (req, res) => {
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
module.exports = updateVideoList