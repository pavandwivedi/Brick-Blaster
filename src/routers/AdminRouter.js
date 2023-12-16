import express from 'express';
import { adminLoginController, adminSignupController, sendNotificationController, sendNotificationToAllController } from '../controllers/AdminController.js';


const adminRouter = express.Router();

adminRouter.post('/register',adminSignupController)
adminRouter.post('/login',adminLoginController);
adminRouter.post('/send-notification/:_id',sendNotificationController)
adminRouter.post('/send-notification-to-all',sendNotificationToAllController)

export default adminRouter;