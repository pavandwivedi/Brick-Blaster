import express from 'express';

import { adminLoginController, adminSignupController, fcmTokenController, getAllUsersController, searchUserController, sendNotificationController, sendNotificationToAllController } from '../controllers/AdminController.js';
import { checkAdmin } from '../middleware/middlewares.js';


const adminRouter = express.Router();

adminRouter.post('/register',adminSignupController)
adminRouter.post('/login',adminLoginController);
adminRouter.get('/retrieveall',checkAdmin,getAllUsersController)
adminRouter.get('/search',checkAdmin,searchUserController)
adminRouter.post('/add-fcm-token/:_id',checkAdmin,fcmTokenController);
adminRouter.post('/send-notification/:_id',checkAdmin,sendNotificationController)
adminRouter.post('/send-notification-to-all',checkAdmin,sendNotificationToAllController)

export default adminRouter;