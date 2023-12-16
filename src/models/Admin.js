import mongoose from "mongoose"


const adminSchema = mongoose.Schema({
    
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    id:{type:String , required:true},
});

const adminModel = mongoose.model('admin',adminSchema);
export default adminModel;