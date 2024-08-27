import VideosList from '../../models/VideosList.js';

const getAllVideoLists = async (req, res) => {
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

export default getAllVideoLists;
