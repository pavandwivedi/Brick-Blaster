import express from 'express';
import { checkUserLogin } from '../middleware/middlewares.js';
import {insertChallengeController,getAllChallengeController,updateChallengeController} from '../controllers/user.challenge.controller.js'

const  challengeRouter = express.Router()

challengeRouter.post('/insertChallenge',checkUserLogin,insertChallengeController)
challengeRouter.get('/getChallenge',checkUserLogin,getAllChallengeController)
challengeRouter.put('/updateChallenge', checkUserLogin,updateChallengeController)

export default challengeRouter;