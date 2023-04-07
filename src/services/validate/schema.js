const Joi = require('joi');

const validateUser = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
});

const validateCategory = Joi.object({
    name: Joi.string().required(),
});

const validatePost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().min(1).required(),
}).messages({
    'string.required': 'Some required fields are missing',
  });

module.exports = {
    validateUser,
    validateCategory,
    validatePost,
};