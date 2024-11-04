import Joi from "joi";

export const createSchema = Joi.object({
    id:Joi.string().hex().length(24),
    name:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().min(1).required(),
    discount:Joi.number().min(0).max(100).optional(),
    mainImage:Joi.array().items({
        "fieldname": Joi.string().required(),
        "originalname": Joi.string().required(),
        "encoding": Joi.string().required(),
        "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        "destination":Joi.string().required(),
        "filename": Joi.string().required(),
        "path":Joi.string().required(),
        "size":Joi.number().max(500000).required(),
      }).max(1).required(),
      subImage:Joi.array().items(
        Joi.object({
            "fieldname": Joi.string().required(),
            "originalname": Joi.string().required(),
            "encoding": Joi.string().required(),
            "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').required(),
            "destination":Joi.string().required(),
            "filename": Joi.string().required(),
            "path":Joi.string().required(),
            "size":Joi.number().max(500000).required(),
      })).max(5).optional(), 
      status:Joi.string().valid('Active','NotActive').optional(),
      duration:Joi.number().min(1).required(),
      availabilityDays:Joi.alternatives().try(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
    ,Joi.array().items(
        Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
      )).optional(),
      startTime:Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ ).required(),
      endTime:Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ ).required(),
      categoryId:Joi.string().hex().length(24).required(),
      subcategoryId:Joi.string().hex().length(24).required(),
      contributors:Joi.alternatives().try(Joi.string(),Joi.array().items(Joi.string())).required(),
})
export const updateSchema =Joi.object({
    id:Joi.string().hex().length(24),
    name:Joi.string().optional(),
    description:Joi.string().optional(),
    price:Joi.number().min(1).optional(),
    discount:Joi.number().min(0).max(100).optional(),
    mainImage:Joi.array().items({
        "fieldname": Joi.string().optional(),
        "originalname": Joi.string().optional(),
        "encoding": Joi.string().optional(),
        "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').optional(),
        "destination":Joi.string().optional(),
        "filename": Joi.string().optional(),
        "path":Joi.string().optional(),
        "size":Joi.number().max(500000).optional(),
      }).max(1).optional(),
      subImage:Joi.array().items(
        Joi.object({
            "fieldname": Joi.string().optional(),
            "originalname": Joi.string().optional(),
            "encoding": Joi.string().optional(),
            "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').optional(),
            "destination":Joi.string().optional(),
            "filename": Joi.string().optional(),
            "path":Joi.string().optional(),
            "size":Joi.number().max(500000).optional(),
      })).max(5).optional(), 
      status:Joi.string().valid('Active','NotActive').optional(),
      duration:Joi.number().min(1).optional(),
      availabilityDays:Joi.alternatives().try(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
    ,Joi.array().items(
        Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
      )).optional(),
      startTime:Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ ).optional(),
      endTime:Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ ).optional(),
      categoryId:Joi.string().hex().length(24).optional(),
      subcategoryId:Joi.string().hex().length(24).optional(),
      contributors:Joi.alternatives().try(Joi.string(),Joi.array().items(Joi.string())).optional(),
})
export const detailsSchema =Joi.object({
  id:Joi.string().hex().length(24),
});
export const deleteSchema =Joi.object({
  id:Joi.string().hex().length(24),
});