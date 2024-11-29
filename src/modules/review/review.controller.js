import appointmentModel from "../../../model/appointment.model.js";
import reviewModel from "../../../model/review.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const create = async(req,res)=>{
    const{comment,ratting} = req.body;
    const {serviceId}=req.params;
    const appointment = await appointmentModel.findOne({userId:req.user._id,status:"completed","services.serviceId":serviceId});
    if(!appointment){
        return res.status(404).json({message:"can't review this service"});
    }
    const checkReview = await reviewModel.findOne({userId:req.user._id,serviceId});
    if(checkReview){
        return res.status(404).json({message:"already reviewed this service"});
    }
    if(req.file){
        
        const{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/product/${serviceId}/review`});
            req.body.image={secure_url,public_id} ;
    }
    const review = await reviewModel.create({comment,ratting,serviceId,userId:req.user._id,image:req.body.image});
    return res.status(200).json({message:"success",review});
}