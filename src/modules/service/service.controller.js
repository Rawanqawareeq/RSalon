import 'dotenv/config'
import slugify from "slugify";
import categoryModel from "../../../model/category.model.js";
import subCategoryModel from "../../../model/subcategory.model.js";
import serviceModel from "../../../model/service.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const create = async (req,res)=>{
    const {name,description,price,status,duration,availabilityDays,startTime,endTime,categoryId,subcategoryId,contributors} = req.body;

    const category = await categoryModel.findById(categoryId);
    if(!category){
        return res.status(404).json({message:"Category not found"});
    }
    const subCategory = await subCategoryModel.find({_id:subcategoryId,categoryId});
    if(!subCategory){
        return res.status(404).json({message:"subCategory not found"});
    }
    req.body.name = name.toLowerCase();

  if(await serviceModel.findOne({name:req.body.name})){
      return res.status(409).json({message:"service already exsits"});
  }
    req.body.Slug = slugify(req.body.name);
    const finalPrice =0;
    req.body.finalPrice = price -(((req.body.discount || 0)/100)*price);
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:
        `${process.env.APP_NAME}/service/${name}`});
    req.body.mainImage = {secure_url,public_id};
    req.body.subImage =[];
 for(const file of req.files.subImage){
    const{secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:
        `${process.env.APP_NAME}/service/${name}/subImage`});
        req.body.subImage.push({secure_url,public_id});
 };
 req.body.createdBy = req.user._id;
 req.body.updatedBy = req.user._id;

 const service = await serviceModel.create(req.body);
 return res.status(200).json({message:"success",service});
}
export const update = async (req,res)=>{
    const id = req.params.id;
    const service = await serviceModel.findById(id);
    if(!service){
        return res.status(404).json({message:"Service not found"});
    }
    if(req.body.name){
        if( await serviceModel.findOne({name:service.name,_id:{$ne:id}})){
            return res.status(409).json({message:"service already exsits"});
        }
        req.body.name = req.body.name.toLowerCase();
        req.body.Slug = slugify(req.body.name);
    }   
    if(req.body.categoryId && !await categoryModel.findById(categoryId) ){  
        return res.status(404).json({message:"Category not found"});
    }
    if(req.body.subcategoryId && !await subcategoryIdModel.findone({_id:subcategoryId,categoryId})){
        return res.status(404).json({message:"subCategory not found"});
    }
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:
            `${process.env.APP_NAME}/service/${name}`});
            req.body.mainImage = {secure_url,public_id};
        req.body.subImage =[];
        for(const file of req.files.subImage){
           const{secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:
               `${process.env.APP_NAME}/service/${name}/subImage`});
               req.body.subImage.push({secure_url,public_id});
        };
    }
    if(req.body.price){
    const finalPrice =0;
    req.body.finalPrice = price -(((req.body.discount || 0)/100)*price);
    }
    const serviceUpdate = await serviceModel.findByIdAndUpdate(id,req.body,{new:true});
 return res.status(200).json({message:"success",service:serviceUpdate});
}
export const getAll = async(req,res)=>{
    const service = await serviceModel.find({}).populate({
        path:'review',
        populate:{
          path:'userId',
          select:'userName'
        },
    });
    return res.status(200).json({message:"success",service});
}
export const getActive = async(req,res)=>{
    const service = await serviceModel.find({status:'Active'}).populate({
        path:'review',
        populate:{
          path:'userId',
          select:'userName'
        },});
    return res.status(200).json({message:"success",service});
}

export const getDetails = async(req,res)=>{
    const id = req.params.id;
    const service = await serviceModel.findById(id).populate({
        path:'review',
        populate:{
          path:'userId',
          select:'userName'
        },});
    if(!service){
        return res.status(404).json({message:"Service not found"});
    }
    return res.status(200).json({message:"success",service});
}
export const remove = async(req,res)=>{
    const id = req.params.id;
    const service = await serviceModel.findByIdAndDelete(id);
    if(!service){
        return res.status(404).json({message:"Service not found"});
    }
    await cloudinary.uploader.destroy(service.mainImage.public_id);


for (const subImage of service.subImage) {
    await cloudinary.uploader.destroy(subImage.public_id);
}

    return res.status(200).json({message:"success",service});
}