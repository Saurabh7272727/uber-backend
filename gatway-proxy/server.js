import dotenv from 'dotenv';
dotenv.config();
import proxy from "express-http-proxy";
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors({ methods: ['GET', 'HEAD', 'POST'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/users', proxy(process.env.USERS_SERVICES));
app.use('/captains', proxy(process.env.CAPTAINER_SERVICES));
app.use('/rides', proxy(process.env.RIDE_SERVICES));

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
})

