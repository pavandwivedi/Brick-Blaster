import levelModel from "../models/Level.js";
import {userModel} from "../models/User.js";
import {success,error} from "../utills/responseWrapper.utills.js"
import mongoose from "mongoose";



export  async function postLevelController(req,res){
    try {
        const {level,score,stars} = req.body;
        const user = req._id;
        if(!level || !score || !stars)
        return res.send(error(404,"all fields are required"));
    
        const isLevelExist = await levelModel.findOne({$and:[{level},{user}]});
        if(isLevelExist){
            return res.send(error(409,"Level already exists"));
        }
        const levelInfo = new levelModel({level,score,stars,user});
        const createdLevel = await levelInfo.save();
                
        const currUser = await userModel.findById(user);
        currUser?.levels?.push(createdLevel._id);
        await currUser.save();

        res.send(success(200,createdLevel));

    } catch (err) {
        return res.send(error(500, err.message));
    }
}
export  async function getLevelController(req,res){
    try {
        console.log("get levelss")
        const levelNo = req.params.levelNo;
        const user = req._id;
        const currUser = await userModel.findById(user);
        if(!currUser){
            return res.send(error(404,"user does not exist! "));
        }
        const levelInfo = await levelModel.findOne({$and : [{"level":levelNo},{user}]});
        if(!levelInfo){
            return res.send(error(404,"level info does not exist!"));
        }
        return res.send(success(200,levelInfo));
        
    } catch (err) {
        return res.send(error(500,err.message));
    }
}
export async function getAllLevelsController(req, res) {
    try {
      const user = req._id;
      const currUser = await userModel.findById(user);
  
      if (!currUser) {
        return res.send(error(404,'User does not exist!'));
      }
  
      const allLevels = await levelModel.find({ user });
  
      if (!allLevels || allLevels.length === 0) {
        return res.send(error(404,'No level information available!'));
      }
  
      return res.send(success(200,allLevels));
    } catch (err) {
      return res.send(error(500,err.message));
    }
}
export  async function updateLevelController(req,res){
    try {
        const levelNo = req.params.levelNo;
        const user = req._id;
        const {score} = req.body;
        const {star} = req.body;
        const levelInfo = await levelModel.findOne({$and : [{"level":levelNo},{user}]});
        if(!levelInfo){
            return res.send(error(404,"level info does not exist!"));
        }

        if(levelInfo["score"]<score){
            levelInfo["score"]=score;
        }
        if (levelInfo['star']<star){
            levelInfo['star'] = star;
        }

        const savedLevel = await levelInfo.save();
        return res.send(success(200,savedLevel));


    } catch (err) {
       
        return res.send(error(500,err.message));
    }
}

export async function postAllLevelController(req, res) {
    try {
        const levelsData = req.body.levels;
         // Assuming levelsData is an array of level objects
        
        const user = req._id;
        if (!Array.isArray(levelsData) || levelsData.length === 0) {
            return res.send(error(400, "Levels data is required and should be an array."));
        }

        const createdLevels = [];
        for (const levelData of levelsData) {
            
            const { level, score, stars } = levelData;
            console.log(level,score,stars)
          

            // const isLevelExist = await levelModel.findOne({ level, user });
            // if (isLevelExist) {
            //     return res.send(error(409, `Level ${level} already exists for the user.`));
            // }

            const levelInfo = new levelModel({ level, score, stars, user });
            console.log(levelInfo);
            const createdLevel = await levelInfo.save();
            console.log(createdLevel)
            createdLevels.push(new mongoose.Types.ObjectId(createdLevel._id));
            console.log(createdLevels)

            const currUser = await userModel.findById(new mongoose.Types.ObjectId(user));
            console.log(currUser);
            currUser?.levels?.push(createdLevel._id);
            await currUser.save();
        }

        res.send(success(200, { createdLevels }));

    } catch (err) {
        return res.send(error(500, err.message));
    }
}

