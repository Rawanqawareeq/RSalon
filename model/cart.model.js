import { model, Schema, Types } from "mongoose";

const cartSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
    services:[{
        serviceId:{
            type:Types.ObjectId,
            ref:'Service',
            required:true,
        },
       day:{
        type: String, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
       }
    }]
},{timestamps:true});
const cartModel = model('Cart',cartSchema);
export default cartModel;