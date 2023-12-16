import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id:{type:String , required:true},
    fcmTokens: [String], // Array of FCM tokens
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true}, 
    profilePhotoURL:{type:String,default:null},
    coins:{type:Number,default:0},
    highestScore:{type:Number,default:0},
    ruby:{type:Number,default :0},
    totalStars:{type:Number,default:0},
    powerups1:{type:Number,default:0},
    powerups2:{type:Number,default:0},
    powerups3:{type:Number,default:0},
    
    Achievments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'achievement',
        }
    ],
    Levels:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'level',

        }
    ]
})

const userModel = mongoose.model('user',userSchema);
export default userModel;