import express from 'express';
import { getUserController, loginController, signupController} from '../controllers/UserController.js';
import { checkUser,signupMiddleware } from '../middleware/middlewares.js';
const userRouter = express.Router();
userRouter.post('/signup',signupMiddleware,signupController);
userRouter.post('/login',loginController);
userRouter.get('/retrieve',checkUser,getUserController);

export default userRouter;