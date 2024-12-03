import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import userRouter from './routes/users.route.js';
import dataBaseConnect from './db/db.js';
import morgan from 'morgan';
import { connectToRabbitMQ } from './service/rabbit.js';
import { credentials } from 'amqplib';

const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST'], credentials: true }))
app.use(express.json());
dataBaseConnect();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToRabbitMQ();
app.use('/', userRouter);

export default app;
