import { Router } from 'express';

import CourseContentRouter from './courseContent/index.js';
import CourseRouter from './courses/index.js';
import PracticePaperRouter from './practicePaper/index.js';
import StudentRouter from './students/index.js';
import TeacherRouter from './teachers/index.js';
import TestRouter from './tests/index.js';
import VideoRouter from './videos/index.js';

const ApiRouter = Router();

// Define routes
ApiRouter.use("/courseContent", CourseContentRouter);
ApiRouter.use("/courses", CourseRouter);
ApiRouter.use("/practice-papers", PracticePaperRouter);
ApiRouter.use("/students", StudentRouter);
ApiRouter.use("/teachers", TeacherRouter);
ApiRouter.use("/tests", TestRouter);
ApiRouter.use("/videos", VideoRouter);

export default ApiRouter;
