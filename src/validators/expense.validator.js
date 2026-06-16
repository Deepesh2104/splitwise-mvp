const Joi = require("joi");

const participantSchema = Joi.object({
  userId: Joi.string()
    .uuid()
    .required(),

  shareAmount: Joi.number()
    .positive()
    .optional(),

  sharePercentage: Joi.number()
    .min(0)
    .max(100)
    .optional(),
});

const createExpenseSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(255)
    .required(),

  amount: Joi.number()
    .positive()
    .precision(2)
    .required(),

  currency: Joi.string()
    .trim()
    .uppercase()
    .max(10)
    .required(),

  createdByUserId: Joi.string()
    .uuid()
    .required(),

  paidByUserId: Joi.string()
    .uuid()
    .required(),

  splitType: Joi.string()
    .valid(
      "EQUAL",
      "PERCENTAGE",
      "EXACT_AMOUNT"
    )
    .required(),

  expenseDate: Joi.date()
    .max("now")
    .required(),

  participants: Joi.array()
    .items(participantSchema)
    .min(1)
    .required(),
});

const expenseIdParamSchema = Joi.object({
  id: Joi.string()
    .uuid()
    .required(),
});

module.exports = {
  createExpenseSchema,
  expenseIdParamSchema,
};