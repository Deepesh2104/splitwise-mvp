const router = require("express").Router();

const expenseController = require("../controllers/expense.controller");

const validate = require("../middlewares/validation.middleware");

const {
  createExpenseSchema,
  expenseIdParamSchema,
} = require("../validators/expense.validator");

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create Expense
 *     description: Create a new expense and split it among participants
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - currency
 *               - createdByUserId
 *               - paidByUserId
 *               - splitType
 *               - expenseDate
 *               - participants
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dinner
 *               amount:
 *                 type: number
 *                 format: double
 *                 example: 1000
 *               currency:
 *                 type: string
 *                 example: INR
 *               createdByUserId:
 *                 type: string
 *                 format: uuid
 *                 description: User who created the expense record
 *                 example: 11111111-1111-1111-1111-111111111111
 *               paidByUserId:
 *                 type: string
 *                 format: uuid
 *                 description: User who actually paid the expense
 *                 example: 22222222-2222-2222-2222-222222222222
 *               splitType:
 *                 type: string
 *                 enum:
 *                   - EQUAL
 *                   - PERCENTAGE
 *                   - EXACT_AMOUNT
 *                 example: EQUAL
 *               expenseDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-15
 *               participants:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - userId
 *                   properties:
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: 33333333-3333-3333-3333-333333333333
 *                     shareAmount:
 *                       type: number
 *                       format: double
 *                       example: 500
 *                     sharePercentage:
 *                       type: number
 *                       format: double
 *                       example: 50
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/",
  validate(createExpenseSchema),
  expenseController.createExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get Expense By Id
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Expense fetched successfully
 *       404:
 *         description: Expense not found
 */
router.get(
  "/:id",
  validate(expenseIdParamSchema, "params"),
  expenseController.getExpenseById
);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete Expense
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
router.delete(
  "/:id",
  validate(expenseIdParamSchema, "params"),
  expenseController.deleteExpense
);

module.exports = router;