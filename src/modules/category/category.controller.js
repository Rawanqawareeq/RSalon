import slugify from "slugify";
import categoryModel from "../../../model/category.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const createCategory = async(req,res)=>{
     req.body.name = req.body.name;
     if(await categoryModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"Category aleady exists"});
     }
     req.body.slug =slugify(req.body.name);
     const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {folder:`${process.env.APP_NAME}/categories`});
     req.body.image={secure_url,public_id};
     req.body.createdBy = req.user._id;
     req.body.updatedBy = req.user._id;
     const category = await categoryModel.create(req.body);
    return res.status(200).json({massege:"success",category});
}
export const updateCategory= async(req,res)=>{
   const id = req.params.id;
   const category = await categoryModel.findById(id);
   if(!category){
      return res.status(404).json({message:"category not found"});
   }
   category.name = req.body.name.toLowerCase();
   if(await categoryModel.findOne({name:category.name,_id:{$ne:id}})){
      return res.status(409).json({message:"category already exsits"});
   }
   slug:slugify(category.name);
   if(req.file){
     const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path, {folder:`${process.env.APP_NAME}/categories`});
     category.image = {secure_url,public_id};
   }
   category.status=req.body.status;
   category.updatedBy =req.user._id;
   category.save();
   return res.status(200).json({message:"success",category});
}
export const getCategory = async(req,res)=>{
   const category = await categoryModel.find({});
   return res.status(200).json({message:"success",category});
}
export const getActiveCategory = async(req,res)=>{
   const category = await categoryModel.find({status:"Active"}).select("name image" );
   return res.status(200).json({message:"success",category});
}
export const getDetailsCategory = async(req,res)=>{
   const id = req.params.id;
   const category = await categoryModel.findById(id);
   if(!category){
      return res.status(404).json({message:"category not found"});
   }
   return res.status(200).json({message:"success",category});
}
export const deleteCategory = async(req,res)=>{
   const id = req.params.id;
   const category = await categoryModel.findByIdAndDelete(id);
   if(!category){
      return res.status(404).json({message:"category not found"});
   }
   await cloudinary.uploader.destroy(category.image.public_id);
   return res.status(200).json({message:"success",category});

}