import VideosList from '../../models/VideosList.js';

const createVideoList = async (req, res) => {
    try {
        const { ...rest } = req.body;
        const videoList = new VideosList({ ...rest });
        await videoList.save();
        res.status(201).json(videoList);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send(error);
    }
};

export default createVideoList;
