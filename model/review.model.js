import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema({
    comment:{
        type:String,
        required:true,
     },
     ratting:{
        type:Number,
        required:true,
        min:1,
        max:5,
     },
     serviceId:{
        type:Types.ObjectId,
        ref:'service',
        required:true,
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    image:{
        type:Object,
    }
});
const reviewModel = model('review',reviewSchema);
export default reviewModel;