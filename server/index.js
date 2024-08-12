const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const EducationRoutes = require('./routes/EducationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware setup
app.use(cors()); // Enable CORS


app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));


app.use('/', EducationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
