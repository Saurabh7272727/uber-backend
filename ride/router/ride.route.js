import express from 'express';
import { createRide, acceptRide } from '../controller/ride.controller.js';
import Authorization from '../middleware/Auth.User.js';
import captainAuthorization from '../middleware/Auth.captain.js';
import checkUserActive from '../middleware/checkUserActive.js';

const router = express.Router();


router.post('/create-ride', Authorization, createRide);
router.post('/accept-ride', checkUserActive, captainAuthorization, acceptRide);


export default router;