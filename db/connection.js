import 'dotenv/config'
import mongoose from "mongoose"

const  connectDB = async()=>{
    mongoose.connect(process.env.DB).then(()=>{
        console.log("MongoDB connected successfully")
    }).catch((err)=>{
        console.error(`Error connecting to MongoDB: ${err.message}`)
   
    });
}
export default connectDB;