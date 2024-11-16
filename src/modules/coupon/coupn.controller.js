import couponModel from "../../../model/coupon.model.js";

export const create = async(req,res)=>{
    if(await couponModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"Coupon already exists"});
    }
    req.body.expiredDate = new Date(req.body.expiredDate);
    req.body.createdBy= req.user._id;
    req.body.updatedBy= req.user._id;

    const coupon = await couponModel.create(req.body);
    return res.status(200).json({message:"success",coupon});
}
export const getDetails = async(req,res)=>{
    const coupon = await couponModel.findById(req.params.id);
    if(!coupon){
        return res.status(404).json({message:"Coupon not found"});
    }
    return res.status(200).json({message:"success",coupon});
}
export const get = async(req,res)=>{
    const coupon = await couponModel.find();
    if(!coupon){
        return res.status(404).json({message:"Coupon not found"});
    }
    return res.status(200).json({message:"success",coupon});
}
export const update = async(req,res)=>{
    const coupon = await couponModel.findById(req.params.id);
    if(!coupon){
        return res.status(404).json({message:"Coupon not exists"});
    }
    if(req.body.expiredDate){
        req.body.expiredDate = new Date(req.body.expiredDate);
    }
    req.body.updatedBy= req.user._id;
    const updateCoupon = await couponModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
    return res.status(200).json({message:"success",coupon:updateCoupon});
}
export const remove = async(req,res)=>{
    const coupon = await couponModel.findByIdAndDelete(req.params.id);
    if(!coupon){
        return res.status(404).json({message:"Coupon not found"});
    }
    return res.status(200).json({message:"success",coupon});
}