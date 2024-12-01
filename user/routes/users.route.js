import { Router } from 'express';
import userController from '../controller/users.controller.js';
import { body } from 'express-validator';
import { userAuthMain } from '../middleware/userAuth.main.js';
import logoutAuthantication from '../middleware/logout_authantication.user.js';


const router = new Router();

router.post('/register',
    body('email').isEmail().withMessage('please enter correct email address'),
    body('password').isLength({ min: 8 }).withMessage('must be require a at least 8 characters of password'),
    body('fullname.firstname').isLength({ min: 4 }).withMessage('must be at least 4 characters of name'),
    userController.userRegister);


router.post('/login', userController.userLogin);

router.get('/profile', userAuthMain, userController.userProfile);

router.post('/logout', logoutAuthantication, userController.userlogout);
export default router;