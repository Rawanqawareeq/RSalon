import { string } from "joi";
import { model, Schema, Types } from "mongoose";

const appointmentSchema = new Schema({
    couponId:{
        type:Types.ObjectId,
        ref:'coupon',
    },
    userId:{
       type:Types.ObjectId,
       ref:'User',
       required:true,
    },
    services:[{
        serviceName:{
            Type:string,
        },
        serviceId:{
            type:Types.ObjectId,
            ref:'service',
            required:true,
        },
        finalPrice:{
            type:Number,
            required:true,
        },
        day:{
            type: String, 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
        }
    }],
    finalPrice:{
        type:Number,
        required:true,
     },
    address:{
        type:String,
        required:true,
     },
     PhoneNumber:{
        type:String,
        required:true,
     },
     paymentType:{
        type:String,
        enum:['cash','cart'],
        default:'cash',
     },
     status:{
        type:String,
        enum:['pending','cancelled','confirmed','Rescheduled'],
        default:'pending',
     },
     notes:{
        type:String,
     },
     rejectedReason:{
        type:String,
     },
     UpdatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true});
const appointmentModel = model('appointment',appointmentSchema);
export default appointmentModel;