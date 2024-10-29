import { model, Schema, Types } from "mongoose";

const subCategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
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
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true,
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,

    },
    UpdatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
})
const subCategoryModel = model('subCategory',subCategorySchema);
export default  subCategoryModel;