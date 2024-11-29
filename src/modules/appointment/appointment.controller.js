import 'dotenv/config'
import appointmentModel from "../../../model/appointment.model.js";
import cartModel from "../../../model/cart.model.js";
import serviceModel from "../../../model/service.model.js";
import UserModel from "../../../model/user.model.js";
import Stripe from 'stripe';
import couponModel from '../../../model/coupon.model.js';
const stripe = new Stripe(process.env.STRIP);

export const create = async(req,res)=>{
   const cart = await cartModel.findOne({userId:req.user._id});
   const {couponName} = req.body; 
   if(!cart || cart.services.length === 0){
    return res.status(404).json({message:"cart is empty"});
   }
   if(couponName){
      const coupon = await couponModel.findOne({name:couponName});
      if(!coupon){
         return res.status(404).json({message:"Coupon not found"});
      }
      if(coupon.expiredDate < new Date()){
         return res.status(400).json({message:"Coupon expired"});
      }
     if(coupon.usedBy.includes(req.user._id)){
      return res.status(404).json({message:"user not found"});
     }
     req.body.coupon = coupon;
   }
   req.body.services = cart.services;
   const finalServicesList =[];
   let subtotal = 0;
     for(let service of req.body.services){
       const ckeckServices = await serviceModel.findOne({_id:service.serviceId,availabilityDays:{$in:service.day}});
       if(!ckeckServices){
         return res.status(404).json({message:"service not found"})
       }
       service = service.toObject();
       service.servicesName = ckeckServices.name;    
      service.finalPrice =ckeckServices.price;
       service.discount = ckeckServices.discount;
       service.day =ckeckServices.day;
       subtotal += service.finalPrice||0;
       finalServicesList.push(service);
   }

   const user = await UserModel.findById(req.user._id);
   if(!req.body.PhoneNumber){
      req.body.PhoneNumber = user.PhoneNumber;
   }
   if(!req.body.address){
      req.body.address = user.address;
   }

   const session = await stripe.checkout.sessions.create({
      line_items: [
          {
            price_data: {currency: 'USD',
            unit_amount:(subtotal - (subtotal * ((req.body.coupon?.ammount || 0)))),
             product_data:{
                 name:user.userName,
             }
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `https://www.facebook.com`,
        cancel_url: `https://www.youtube.com`,
  });

  const appointment = await appointmentModel.create({userId:req.user._id,
    services:finalServicesList,
   finalPrice:(subtotal - (subtotal * ((req.body.coupon?.ammount || 0)))),
   address:req.body.address,
   PhoneNumber:req.body.PhoneNumber,
   UpdatedBy:req.user._id,
})
 await cartModel.updateOne({userId:req.user._id},{services:[]});
   return res.status(200).json({message:"scuess",appointment,session })
   
};
export const getAllAdmin = async(req,res)=>{
  const appointments = await appointmentModel.find().populate({
   path:'userId',
   select:'userName'
  });
  return res.status(200).json({message:"success",appointments});
}
export const getAllUser = async(req,res)=>{
   const appointments = await appointmentModel.findOne({ userId:req.user._id,
      $or:[{
         status:"pending",
      },
      {
       status:"confirmed",
    },
    {
       status:'Rescheduled',
    }
   ]
   });
   return res.status(200).json({message:"success",appointments});
}
export const updateappointments = async (req,res)=>{
   const {id}= req.params;
   const appointments = await appointmentModel.findById(id);
   if(!appointments){
      return res.status(404).json({message:"appointment not found"});
   }
   const updateappointments = await appointmentModel.findByIdAndUpdate({_id:id},{status:req.body.status},{new:true});
   return res.status(200).json({message:"success",appointment:updateappointments});
}