import 'dotenv/config'
import slugify from "slugify";
import categoryModel from "../../../model/category.model.js";
import subCategoryModel from "../../../model/subcategory.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const createSubcategory = async(req,res)=>{
    const {categoryId} = req.body;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }
    req.body.name = req.body.name.toLowerCase();
    if(await subCategoryModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"subcategory alredy exsits"});
    }
    req.body.slug = slugify(req.body.name);
    const{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {folder:`${process.env.APP_NAME}/subcategory`});
    req.body.image = {secure_url,public_id};
    req.body.createdBy = req.user._id;
    req.body.UpdatedBy  = req.user._id;
    const subCategory = await subCategoryModel.create(req.body);
    return res.status(200).json({message:"success",subCategory});
}
export const updateSubCategory = async (req,res)=>{
    const {categoryId} = req.body; 
    const id = req.params.id;  
    if(!await categoryModel.findById(categoryId)){
        return res.status(404).json({message:"category not found"});
    }
    if(!await subCategoryModel.findById(id)){
        return res.status(404).json({message:"subcategory not found"});
    }
    req.body.name = req.body.name.toLowerCase();
    if(await subCategoryModel.findOne({name:req.body.name,_id:{$ne:id}})){
        return res.status(409).json({message:"subcategory alredy exsits"});
    }
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {folder:`${process.env.APP_NAME}/subcategory`});
        req.body.image = {secure_url,public_id};
    }
    req.body.slug = slugify(req.body.name);
    req.body.UpdatedBy  = req.user._id;
    const subCategory = await subCategoryModel.findByIdAndUpdate(id,req.body,{new:true});
    return res.status(200).json({message:"success",subCategory});
}
export const getAll = async (req,res)=>{
    const categoryId = req.params.categoryId;
    const category = await categoryModel.findById(categoryId );
    if(!category){
        return res.status(404).json({message:"Main category Not Found"});
    }
    const subcategory = await subCategoryModel.find({categoryId});
    return res.status(200).json({message:"success",subcategory});
}
export const getActive = async (req,res)=>{
    const categoryId = req.params.categoryId;
    const category = await categoryModel.findById(categoryId );
    if(!category){
        return res.status(404).json({message:"Main category Not Found"});
    }
    const subcategory = await subCategoryModel.find({categoryId,status:"Active"});
    return res.status(200).json({message:"success",subcategory});
}
export const getDetails = async(req,res)=>{
    const categoryId = req.params.categoryId;
    const category = await categoryModel.findById(categoryId );
    if(!category){
        return res.status(404).json({message:"Main category Not Found"});
    }
    const subcategory = await subCategoryModel.findById(req.params.id);
    return res.status(200).json({message:"success",subcategory});
}
export const deleteSubCategory = async (req,res)=>{
    const categoryId = req.params.categoryId;
    const id = req.params.id;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return res.status(404).json({message:"Main category Not Found"});
    }
    const subcategory = await subCategoryModel.findByIdAndDelete(id);
    if(!subcategory){
        return res.status(404).json({message:"subcategory not found"});
    }
    await cloudinary.uploader.destroy(subcategory.image.public_id);
    return res.status(200).json({message:"success",subcategory});
}