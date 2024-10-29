import 'dotenv/config'
import UserModel from '../../model/user.model.js';
import jwt from 'jsonwebtoken';
export const Role ={
    Admin :'Admin',
    User:'User',
    SuperAdmin:'SuperAdmin'
}
export const authorization =(role=[])=>{
   return async(req,res,next)=>{
    const {authorization } = req.headers;
    if(!authorization?.startsWith(process.env.BEARERTOKEN)){
        res.status(400).json({message:"invalid BEARERtoken"})
    }
    const token = authorization.split(process.env.BEARERTOKEN)[1];
    const decode = jwt.verify(token,process.env.LOGIN);
    const user = await UserModel.findById(decode.userId).select('userName role');
    if(!user){
        res.status(404).json({message:"User Not Found"});
    }
    if(!role.includes(user.role)){
        res.status(403).json({message:"User Not auth"});
    }
    req.user = user;
     next();
   }

}