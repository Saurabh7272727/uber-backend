import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import captionRouter from './routes/captions.route.js';
import dataBaseConnect from './db/db.js';
import { connectToRabbitMQ } from './service/rabbit.js';


const app = express();
app.use(cors({ methods: ['GET', 'POST'] }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dataBaseConnect();
connectToRabbitMQ();

app.use('/', captionRouter);
export default app;
