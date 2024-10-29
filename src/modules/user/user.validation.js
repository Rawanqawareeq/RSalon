import Joi from "joi";
import { Schema } from "mongoose";

export const addUserSchema =  Joi.object({
    userName:Joi.string().min(3).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-zA-Z0-9]{3,20}$/).required(),
    confirmPassword:Joi.string().valid(Joi.ref('password')).required(),
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
});
export const updateUserSchema =  Joi.object({
    id:Joi.string().hex().length(24),
    userName:Joi.string().min(3).max(20),
    email:Joi.string().email(),
    password:Joi.string().pattern(/^[A-Z][a-zA-Z0-9]{3,20}$/),
    phone:Joi.string().length(10).pattern(/^[0-9]{10}$/),
    address:Joi.string(),
    confirmEmail:Joi.boolean(),
    gender:Joi.string().valid('Male','Female'),
    status:Joi.string().valid('Active','NotActive'),
    role:Joi.string().valid('User','Admin','SuperAdmin'),
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
});
export const deleteUserSchema =  Joi.object({
    id:Joi.string().hex().length(24),
});
export const userDetails=  Joi.object({
    id:Joi.string().hex().length(24),
});