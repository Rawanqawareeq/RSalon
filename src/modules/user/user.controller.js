import 'dotenv/config'
import UserModel from "../../../model/user.model.js";
import bcrypt from 'bcrypt';
import { Role } from "../../middlewave/auth.js";
import cloudinary from "../../utls/cloudinary.js";

export const addUser = async(req,res)=>{
    const {userName,email,password} = req.body;
    const hashPassword = await bcrypt.hashSync(password,parseInt(process.env.SALTROUNDS));
    req.body.password = hashPassword;
    if(req.body.role && req.user.role == 'Admin'){
       req.body.role = 'User';
    }
    if(req.file){
        const{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {folder:`${process.env.APP_NAME}/user`});
        req.body.image = {secure_url,public_id};
    }
    req.body.createdBy = req.user._id;
    req.body.UpdatedBy = req.user._id;
    const createUser = await UserModel.create(req.body);
    return res.json({message:"success",user:createUser});
}
export const UpdateUser = async(req,res)=>{
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    user.email = req.body.email.toLowerCase();
    if(await UserModel.findOne({email:req.body.email,_id:{$ne:req.params.id}})){
        return res.status(404).json({message:"user already exsits" });
    }
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.confirmEmail = req.body.confirmEmail;
    user.gender = req.body.gender;

    if(req.file){
        const{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {folder:`${process.env.APP_NAME}/user`});
        user.image = {secure_url,public_id};
    }
    if(user.role == 'Admin'){
        user.status = user.status;
        user.role = user.role;
    }
    if(user.role == 'superAdmin'){
        user.status = req.body.status; 
        user.role = req.body.role;
    }
    user.createdBy = user.createdBy;  
    user.UpdatedBy = req.user._id;
    user.save();
    return res.json({message:"success",user});
}
export const userDetails = async(req,res)=>{
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    return res.json({message:"success",user});
}
export const getAll = async(req,res)=>{
    const users = await UserModel.find({});
    return res.json({message:"success",users});
}
export const getActive = async(req,res)=>{
    const users = await UserModel.find({status:"Active",role:{$ne:"SuperAdmin"}});
    return res.json({message:"success",users});
}
export const removeUser = async(req,res)=>{
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    if(req.user.role == Role.Admin && user.role == Role.Admin){
        return res.json({message:"You cannot delete this user."});
    }
    const deleteUser = await UserModel.findByIdAndDelete({_id:id});
    return res.json({message:"success",user:deleteUser});
}
