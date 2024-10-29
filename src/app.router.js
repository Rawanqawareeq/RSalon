import connectDB from "../db/connection.js"
import  AuthRouter from "./modules/auth/auth.router.js";
import cors from 'cors';
import CategoryRouter from "./modules/category/category.router.js";
import UserRouter from "./modules/user/user.router.js";
const initApp =(app,express)=>{
   connectDB();
   app.use(cors());
   app.use(express.json());
   app.get('/',(req,res)=>{
    return res.status(200).json({message:"welcome"});
 });
 app.use('/auth',AuthRouter);
 app.use('/user',UserRouter);
 app.use('/category',CategoryRouter);
 app.use('*',(req,res)=>{
    return res.status(404).json({message:"Page not found"});

 });
 app.use((err,req,res,next)=>{
   res.status(err.statusCode).json({message:err.message});
})
}
export default initApp;