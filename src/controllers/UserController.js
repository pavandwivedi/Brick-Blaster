import userModel from "../models/User.js";
import { generateAccessToken } from "../services/generateAccessToken.service.js";
import { error, success } from "../utills/responseWrapper.utills.js";

export  async function getUserController(req,res){
    try {
        const currUserID = req._id;
        const user = await userModel.findOne({_id:currUserID}).populate('Achievments').populate('Levels');
        if(!user){
            return res.send("user not found!");
        }
        return res.send(user);
    } catch (error) {
        return res.send(error.message);
    }
} 
export async function signupController(req,res){
    try {
        const {name,email,profileURL} = req.body;
        if(!name || !email){
            return res.send(error(422,"insufficient data"));
        }

        const existingUser =  await userModel.findOne({email});

        if(existingUser){
            return res.send(error(400,"user already present"));
        }

       const newUser = new userModel({name,email,profileURL});
       const createdUser = await newUser.save();
       return res.send(success(201,createdUser));
       
    }catch (err){
        return res.send(error(500,err.message));
    }
}

export async function loginController(req,res){
    try {
        const {email }= req.body;

        if(!email){
            return res.send(error(400,"email required"));
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.send(error(404,"user not found"));
        }
        const accessToken = generateAccessToken({...user});
        return res.send(success(200,{accessToken}));
    } catch (err) {
        return res.send(error(500,err.message));
    }
}

