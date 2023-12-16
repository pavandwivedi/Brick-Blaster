import express from 'express';
import {postLevelController,getLevelController,updateLevelController, getAllLevelsController} from '../controllers/LevelController.js';
import { checkUser } from '../middleware/middlewares.js';

const levelRouter = express.Router();
levelRouter.post('/insert',checkUser,postLevelController);
levelRouter.get('/retrieve/:levelNo',checkUser, getLevelController);
levelRouter.patch('/update/:levelNo',checkUser,updateLevelController);
levelRouter.get('/retrievealllevel/',checkUser, getAllLevelsController);

export default levelRouter;