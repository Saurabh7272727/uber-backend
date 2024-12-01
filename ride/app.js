import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router/ride.route.js';
import { connect } from './service/rabbit.js';
const app = express();



app.use(cors({ methods: ['GET', 'HEAD', 'POST'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connect();

app.use('/', router);

export default app;