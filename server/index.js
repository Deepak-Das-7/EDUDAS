import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import ApiRouter from './controllers/Routes.js';


const app = express();
const PORT = process.env.PORT || 1000;

(async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error('Database connection failed', err);
        process.exit(1);
    }

    // Middleware setup
    app.use(cors()); // Enable CORS
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ limit: '5mb', extended: true }));

    // Routes setup
    app.use('/', ApiRouter);

    // Start server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
