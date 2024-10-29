import 'dotenv/config'
import UserModel from "../../../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import { sendEmail } from '../../utls/email.js';
import { customAlphabet } from 'nanoid';
import { Role } from '../../middlewave/auth.js';

export const register = async(req,res)=>{
    const{userName,email,password}= req.body;
    const hashPassword =  await bcrypt.hashSync(password,parseInt(process.env.SALTROUNDS));
    const createUser = await UserModel.create({userName,email,password:hashPassword});
    const token = jwt.sign(email,process.env.CONFIRM_EMAIL_TOKEN);
   await sendEmail(email,"RSalon",userName,token);
    return res.status(201).json({message:"success",user:createUser});
}
export const login = async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    if(!user.confirmEmail){
        return res.status(400).json({message:"Plz comfirm Email"});
    }
    if(user.status == "NotActive"){
        return res.status(400).json({message:"User Not Active"});
    }
    const isMatch = bcrypt.compare(user.password,password);
    if(!isMatch){
        return res.status(400).json({message:"Password Not Match"});
    }
    const token = jwt.sign({userId:user._id,userName:user.userName,email:user.email,status:user.status,role:user.role},process.env.LOGIN)
    return res.status(201).json({message:"success",token});
}
export const sendCode = async(req,res)=>{
    const{email} = req.body;
    const code = customAlphabet('1234567890abcdef',4)();
    const user = await UserModel.findOneAndUpdate({email},{sendCode:code},{new:true});
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({message:"success"});
}
export const forgetPassword = async(req,res)=>{
    const{email,code,password} = req.body;

    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"Email  not found"});
    }
    if(user.sendCode != code){
        return res.status(404).json({message:"Invalid code"});
    }

    user.password= await bcrypt.hash(password,parseInt(process.env.SALTROUNDS));
    user.sendCode = null;
    user.save();
    return res.status(200).json({message:"success"});
}
export const confirmEmail = async(req,res)=>{
    const token = req.params.token;
    const decode = jwt.verify(token,process.env.CONFIRM_EMAIL_TOKEN);
    const user = await UserModel.findOneAndUpdate({email:decode},{confirmEmail:true},{new:true});
    return res.status(200).json({message:"success"});

}
