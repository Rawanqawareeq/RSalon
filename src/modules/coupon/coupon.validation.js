import Joi from "joi";

export const create = Joi.object({
    name:Joi.string().required(),
    amount:Joi.number().min(1).max(50).required(),
    expiredDate:Joi.date().greater('now'),
});
export const get = Joi.object({
    id:Joi.string().hex().length(24),
});
export const update = Joi.object({
    id:Joi.string().hex().length(24),
    name:Joi.string().optional(),
    amount:Joi.number().min(1).max(50).optional(),
    expiredDate:Joi.date().greater('now').optional(),
});
export const remove = Joi.object({
    id:Joi.string().hex().length(24),
});

