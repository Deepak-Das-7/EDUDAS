import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    videoName: { type: String, required: true },
    class: { type: String, required: true },
    duration: { type: String, required: true }
});

const videosListSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    videos: { type: [videoSchema], required: true },
    videoName: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model('VideosList', videosListSchema);
