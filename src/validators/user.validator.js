const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .max(50)
    .required(),

  defaultCurrency: Joi.string()
    .max(10)
    .default("INR"),
});

const updateUserSchema = Joi.object({
  email: Joi.string()
    .email(),

  defaultCurrency: Joi.string()
    .max(10),
});

const userIdParamSchema = Joi.object({
  id: Joi.string()
    .guid({
      version: [
        "uuidv4",
        "uuidv5",
      ],
    })
    .required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
};