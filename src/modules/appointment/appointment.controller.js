import cartModel from "../../../model/cart.model.js";

const create = async(req,res)=>{
   const cart = await cartModel.findOne({userId:req.user._id});
   const {couponName} = req.body; 
   if(!cart || cart.services.length === 0){
    return res.status(404).json({message:"cart is empty"});
   }
   
};