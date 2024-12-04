import cartModel from "../../../model/cart.model.js"
import serviceModel from "../../../model/service.model.js";
export const getCart = async (req,res)=>{
    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart){
        return res.status(404).json({message:"Cart not found"});
    }
    return res.status(200).json({message:"success",cart});
}
export const createCart = async (req,res)=>{

    const {serviceId,day} = req.body;

    const services = await serviceModel.findOne({_id:serviceId,availabilityDays:{$in:day},duration:{$gte:1}});
    if(!services){
        return res.status(404).json({message:"sory appointment is full or day not available"});
    }
   
    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart){
        const newCart = await cartModel.create({userId:req.user._id,services:{serviceId,day}});
        return res.status(200).json({message:"Cart created successfully",cart:newCart});
    }
    for(const service of cart.services){
        if(service.serviceId == serviceId){
            return res.status(404).json({message:"Service is available"});
        }

    }
    cart.services.push({serviceId,day});
    await cart.save();
    return res.status(200).json({message:"Service added to cart successfully",cart});
}
export const removeService = async(req,res)=>{
    const serviceId = req.params.serviceId;
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id},
        {$pull:{serviceId,}},{new:true});
    return res.status(200).json({message:"success",cart});
}
export const removeAll = async(req,res)=>{
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id},{
        services:[],
    },{new:true});
    return res.status(200).json({message:"success"});
}