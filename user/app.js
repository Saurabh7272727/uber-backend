import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import userRouter from './routes/users.route.js';
import dataBaseConnect from './db/db.js';
import morgan from 'morgan';


const app = express();
app.use(cors({ methods: ['GET', 'POST'] }))
app.use(express.json());
dataBaseConnect();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', userRouter);

export default app;
