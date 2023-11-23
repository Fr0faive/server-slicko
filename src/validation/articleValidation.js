import Joi from "joi";

const createArticleValidation = Joi.object({
  title: Joi.string().max(255).required(),
  content: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string(),
  create_at: Joi.date(),
  modified_at: Joi.date(),
  author_id: Joi.string().required(),
});

export default {
  createArticleValidation,
};
