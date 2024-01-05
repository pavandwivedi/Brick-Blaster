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

export async function signupMiddleware(req,res,next){
    try {
        if(Object.keys(req.body).length==0){
            return res.status(400).send(error(400,"body is required"));
        }
        next();
    } catch (err){
        return res.send(error(500,err.message));
    }
}
export async function checkAdmin(req,res,next){
    try {
        if (!req.headers?.authorization?.startsWith("Bearer")){
           return res
              .status(statuscodes.UNAUTHORIZED)
              .send("authorization header is required!");
          }

          const accessToken = req.headers.authorization.split(" ")[1];
          const decoded = Jwt.verify(accessToken,secret_Key);
          req._id = decoded._doc._id;
          const user = await adminModel.findById(req._id);
          if(!user){
            return res.send("admin not found");
          }
          next();
          
    } catch (error) {
        res.status(statuscodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

