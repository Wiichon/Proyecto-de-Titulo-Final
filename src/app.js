import express from 'express';
import morgan from 'morgan';
import tasksRoutes from "./routes/tasks.routes.js"
import authRoutes from "./routes/auth.routes.js";
import evidenceRoutes from "./routes/evidence.routes.js";
import imagesRoutes from "./routes/images.routes.js";
import cookieParser from 'cookie-parser';

import cors from 'cors'


const app =express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',tasksRoutes);
app.use('/api',evidenceRoutes);
app.use('/api',imagesRoutes);



export default app;