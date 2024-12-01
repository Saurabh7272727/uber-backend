import { Router } from 'express';
import captionsController from '../controller/captions.controller.js';
import { body } from 'express-validator';
import captainAuth from '../middleware/captain.auth.js';
import captainBlackList from '../middleware/captain.blackList.js';

const router = Router();



router.post('/register',
    body('fullname.firstname').isLength({ min: 4 }).withMessage("at least 4 letters of your name"),
    body('email').isEmail().withMessage("provide a valid email address"),
    body('password').isLength({ min: 8 }).withMessage("the length of your password must be at least 8 characters"),
    captionsController.register);

router.post('/login', captionsController.login);
router.get('/profile', captainAuth, captionsController.profile);
router.get('/logout', captainBlackList, captionsController.logout);
router.get('/new-ride', captainAuth, captionsController.newRide);
export default router;
