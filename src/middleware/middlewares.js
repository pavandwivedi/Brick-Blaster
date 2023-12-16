import statuscodes from 'http-status-codes';
import Jwt from 'jsonwebtoken';
import userModel from '../models/User.js';


const secret_Key = "greenwebsolutions";

export async function checkUser(req,res,next){
    try {
        if (!req.headers?.authorization?.startsWith("Bearer")){
            res
              .status(statuscodes.UNAUTHORIZED)
              .send("authorization header is required!");
          }

          const accessToken = req.headers.authorization.split(" ")[1];
          const decoded = Jwt.verify(accessToken,secret_Key);
          req._id = decoded._doc._id;
          const user = await userModel.findById(req._id);
          if(!user){
            return res.send("user not found");
          }
          next();
          
    } catch (error) {
        res.status(statuscodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

