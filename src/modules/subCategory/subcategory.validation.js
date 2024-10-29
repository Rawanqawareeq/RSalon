import Joi from "joi";

export const creatSubCategorySchema = Joi.object({
    name:Joi.string().required(),
    image:Joi.object({
        "fieldname": Joi.string().required(),
        "originalname": Joi.string().required(),
        "encoding": Joi.string().required(),
        "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        "destination":Joi.string().required(),
        "filename": Joi.string().required(),
        "path":Joi.string().required(),
        "size":Joi.number().max(500000).required(),
      }).required(),
      slug:Joi.string().optional(),
      status:Joi.string().valid('Active','NotActive').optional(),
      categoryId:Joi.string().hex().length(24).required(),
      createdBy:Joi.string().hex().length(24).optional(),
      updatedBy:Joi.string().hex().length(24).optional(),
});
export const updateSubCategorySchema = Joi.object({
    id:Joi.string().hex().length(24),
    name:Joi.string().optional(),
    image:Joi.object({
        "fieldname": Joi.string().optional(),
        "originalname": Joi.string().optional(),
        "encoding": Joi.string().optional(),
        "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').optional(),
        "destination":Joi.string().optional(),
        "filename": Joi.string().optional(),
        "path":Joi.string().optional(),
        "size":Joi.number().max(500000).optional(),
      }).optional(),
      slug:Joi.string().optional(),
      status:Joi.string().valid('Active','NotActive').optional(),
      categoryId:Joi.string().hex().length(24).optional(),
      createdBy:Joi.string().hex().length(24).optional(),
      updatedBy:Joi.string().hex().length(24).optional(),
});
export const getAllSubCategorySchema = Joi.object({
      categoryId:Joi.string().hex().length(24),
});
export const getActiveSubCategorySchema = Joi.object({
    categoryId:Joi.string().hex().length(24),
});
export const getDetailsSubCategorySchema = Joi.object({
    id:Joi.string().hex().length(24),
    categoryId:Joi.string().hex().length(24),
});
export const deleteSubCategorySchema = Joi.object({
    id:Joi.string().hex().length(24),
    categoryId:Joi.string().hex().length(24),
});