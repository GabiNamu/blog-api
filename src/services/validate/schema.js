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

module.exports = {
    validateUser,
    validateCategory,
};