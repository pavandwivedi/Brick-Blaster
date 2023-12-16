import { insertAchievementController, retrieveAchievementController, retrieveAllAchievementsController, updateAchievementController } from "../controllers/AchievementController.js";
import express from 'express';
import { checkUser } from "../middleware/middlewares.js";

const achievementRouter = express.Router();

achievementRouter.get('/retrieve',checkUser,retrieveAchievementController);
achievementRouter.get('/retrieveall',checkUser,retrieveAllAchievementsController)
achievementRouter.post('/insert',checkUser,insertAchievementController);
achievementRouter.put('/update',checkUser,updateAchievementController);

export default achievementRouter;
