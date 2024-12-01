import express from 'express';
import { createRide } from '../controller/ride.controller.js';
import Authorization from '../middleware/Auth.User.js';



const router = express.Router();


router.post('/create-ride', Authorization, createRide);



export default router;