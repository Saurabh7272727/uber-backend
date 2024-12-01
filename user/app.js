import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import userRouter from './routes/users.route.js';
import dataBaseConnect from './db/db.js';
import morgan from 'morgan';
import { connectToRabbitMQ } from './service/rabbit.js';

const app = express();
app.use(cors({ methods: ['GET', 'POST'] }))
app.use(express.json());
dataBaseConnect();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToRabbitMQ();
app.use('/', userRouter);

export default app;
