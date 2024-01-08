import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config();
export default async function connectDB(){
    try {
        const DB_OPTIONS = {
   dbName:process.env.DBNAME,
   user:process.env.DBUSERNAME,
   pass:process.env.DBPASSWORD,
   authSource:process.env.DBAUTHSOURCE
 }
        const connect =  await mongoose.connect(  process.env.DATABASE_URL,DB_OPTIONS);
        console.log('DB connected! '+connect.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
