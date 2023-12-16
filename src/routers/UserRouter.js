import express from 'express';
import {fcmTokenController, getUserController, searchUserController} from '../controllers/UserController.js';
import { checkUser } from '../middleware/middlewares.js';
import { getAllUsersController } from '../controllers/UserController.js';


const userRouter = express.Router();


userRouter.get('/retrieve',checkUser ,getUserController);
userRouter.get('/retrieveall',checkUser,getAllUsersController)
userRouter.get('/search',searchUserController)
userRouter.post('/add-fcm-token/:_id',fcmTokenController);


export default userRouter;