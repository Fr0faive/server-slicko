import Joi from "joi";

const createProductValidation = Joi.object({
  name: Joi.string().max(255).required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
  stock: Joi.number().optional(),
});

const getProductByIdValidation = Joi.number().required();
const getProductValidation = Joi.string().max(100).required();

const updateProductValidation = Joi.object({
  name: Joi.string().max(255).optional(),
  price: Joi.number().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
  stock: Joi.number().optional(),
});

export {
  createProductValidation,
  getProductByIdValidation,
  getProductValidation,
  updateProductValidation,
};
