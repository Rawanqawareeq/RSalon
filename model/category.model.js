import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:20,
    },
    image:{
        type:Object,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['Active','NotActive'],
        default:'Active',
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
},{
    timestamps:true,
    toJSON:{virtual:true},
    toObject:{virtual:true},
});
categorySchema.virtual("subCategory",{
    localField:'_id',
    foreignField:'categoryId',
    ref:"subCategory",
})
const categoryModel = model('category',categorySchema);
export default categoryModel;