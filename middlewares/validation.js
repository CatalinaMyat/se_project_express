// middlewares/validation.js
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

// custom URL validator (per lesson example)
const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error("string.uri");
};

// Items
const validateCreateItem = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The "name" field must be at least 2 characters long',
      "string.max": 'The "name" field must be at most 30 characters long',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

const validateItemId = celebrate({
  params: Joi.object({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

// Users
const validateUpdateProfile = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The "name" field must be at least 2 characters long',
      "string.max": 'The "name" field must be at most 30 characters long',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
  }),
});

const validateUserSignup = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateCreateItem,
  validateItemId,
  validateUpdateProfile,
  validateUserSignup, // ← add
  validateUserLogin, // ← add
};
