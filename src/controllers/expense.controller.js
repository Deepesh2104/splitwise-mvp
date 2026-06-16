const expenseService = require("../services/expense.service");

const {
  success,
  error,
} = require("../utils/api-response");

class ExpenseController {
  async createExpense(req, res) {
    try {
      const expense =
        await expenseService.createExpense(
          req.body
        );

      return success(
        res,
        expense,
        "Expense created successfully",
        201
      );
    } catch (err) {
      return error(
        res,
        err.message,
        400
      );
    }
  }

  async getExpenseById(req, res) {
    try {
      const expense =
        await expenseService.getExpenseById(
          req.params.id
        );

      return success(
        res,
        expense,
        "Expense fetched successfully"
      );
    } catch (err) {
      return error(
        res,
        err.message,
        404
      );
    }
  }

  async deleteExpense(req, res) {
    try {
      const result =
        await expenseService.deleteExpense(
          req.params.id
        );

      return success(
        res,
        result,
        "Expense deleted successfully"
      );
    } catch (err) {
      return error(
        res,
        err.message,
        404
      );
    }
  }
}

module.exports = new ExpenseController();