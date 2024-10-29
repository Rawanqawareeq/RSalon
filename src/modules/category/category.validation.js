import Joi from "joi";

export const createCategorySchema = Joi.object({
    name: Joi.string().required(),
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
    slug: Joi.string().optional(),
    status: Joi.string().valid('Active','NotActive').optional(),
    createdBy:Joi.string().hex().length(24).optional(),
    updatedBy:Joi.string().hex().length(24),  
})
export const updateCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).optional(),
    name: Joi.string().optional(),
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
    slug: Joi.string().optional(),
    status: Joi.string().valid('Active','NotActive').optional(),
    createdBy:Joi.string().hex().length(24).optional(),
    updatedBy:Joi.string().hex().length(24),  
})
export const getCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).optional(),

});
export const deleteCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).optional(),

});

