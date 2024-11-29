import { model, Schema, Types } from "mongoose";

const serviceSchema = new Schema({
name:{
    type:String,
    required:true,
    unique:true,
},
Slug:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
},
discount:{
    type:Number,
    default:0,
},
finalPrice:{
    type:Number,
    required:true,
},
mainImage:{
    type:Object,
    required:true,
},
subImage:[{
    type:Object,
}],
status:{
    type:String,
    enum:['Active','NotActive'],
    default:'Active',
},
duration: { 
    type: Number, 
    required: true 
},
availabilityDays: { 
    type: [String], 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
    default:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
},
startTime: {
    type: String,
     required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ 
}, 
endTime: {
     type: String, 
     required: true, 
     match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ 
    },  
categoryId:{
    type:Types.ObjectId,
    ref:'category',
    required:true,
},
subcategoryId:{
    type:Types.ObjectId,
    ref:'subCategory',
    required:true,
},
contributors: [{ 
    type: String,
     required:true,
    }], 
createdBy:{
    type:Types.ObjectId,
    ref:'User',
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User',
}
},{timestamps:true});
serviceSchema.virtual('review',{
    ref:'review',
    localField:'_id',
    foreignField:'serviceId',
});
serviceSchema.virtual('review',
    {
        ref:'review',
        localField:'_id',
        foreignField:'serviceId'
    }
);

const serviceModel = model('service',serviceSchema);
export default serviceModel;