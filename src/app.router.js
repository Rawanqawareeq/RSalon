import connectDB from "../db/connection.js"
import  AuthRouter from "./modules/auth/auth.router.js";
import cors from 'cors';
import CategoryRouter from "./modules/category/category.router.js";
import UserRouter from "./modules/user/user.router.js";
import serviceRouter from "./modules/service/service.router.js";
import cartRouter from "./modules/cart/cart.router.js";
import couponRouter from "./modules/coupon/coupon.router.js";
import appointmentRouter from "./modules/appointment/appointment.router.js";
import reviewRouter from "./modules/review/review.router.js";
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
 app.use('/service',serviceRouter);
 app.use('/cart',cartRouter);
app.use('/coupon',couponRouter);
app.use('/appointment',appointmentRouter);
app.use('/review',reviewRouter);
 app.use('*',(req,res)=>{
    return res.status(404).json({message:"Page not found"});

 });
 app.use((err,req,res,next)=>{
   res.status(err.statusCode).json({message:err.message});
})
}
export default initApp;