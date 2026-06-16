const {
  sequelize,
  Expense,
  ExpenseParticipant,
  User,
} = require("../models");

class ExpenseService {
  async createExpense(payload) {
    const transaction =
      await sequelize.transaction();

    try {
      const {
        name,
        amount,
        currency,
        createdByUserId,
        paidByUserId,
        splitType,
        expenseDate,
        participants,
      } = payload;

      const [createdByUser, paidByUser] =
        await Promise.all([
          User.findOne({
            where: {
              id: createdByUserId,
              deletedAt: null,
            },
            transaction,
          }),

          User.findOne({
            where: {
              id: paidByUserId,
              deletedAt: null,
            },
            transaction,
          }),
        ]);

      if (!createdByUser) {
        throw new Error(
          "Creator user not found"
        );
      }

      if (!paidByUser) {
        throw new Error(
          "Payer user not found"
        );
      }

      const participantIds =
        participants.map(
          (participant) =>
            participant.userId
        );

      const participantUsers =
        await User.findAll({
          where: {
            id: participantIds,
            deletedAt: null,
          },
          transaction,
        });

      if (
        participantUsers.length !==
        participantIds.length
      ) {
        throw new Error(
          "One or more participants not found"
        );
      }

      const expense =
        await Expense.create(
          {
            name,
            amount,
            currency,
            createdByUserId,
            paidByUserId,
            splitType,
            expenseDate,
          },
          { transaction }
        );

      const expenseParticipants =
        participants.map(
          (participant) => ({
            expenseId: expense.id,
            userId:
              participant.userId,
            shareAmount:
              participant.shareAmount ??
              null,
            sharePercentage:
              participant.sharePercentage ??
              null,
          })
        );

      await ExpenseParticipant.bulkCreate(
        expenseParticipants,
        { transaction }
      );

      await transaction.commit();

      return this.getExpenseById(
        expense.id
      );
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async getExpenseById(expenseId) {
    const expense =
      await Expense.findOne({
        where: {
          id: expenseId,
          deletedAt: null,
        },
        include: [
          {
            model: User,
            as: "createdBy",
            attributes: [
              "id",
              "email",
            ],
          },
          {
            model: User,
            as: "paidBy",
            attributes: [
              "id",
              "email",
            ],
          },
          {
            model: ExpenseParticipant,
            as: "participants",
            include: [
              {
                model: User,
                as: "participant",
                attributes: [
                  "id",
                  "email",
                ],
              },
            ],
          },
        ],
      });

    if (!expense) {
      throw new Error(
        "Expense not found"
      );
    }

    return expense;
  }

  async deleteExpense(expenseId) {
    const expense =
      await Expense.findOne({
        where: {
          id: expenseId,
          deletedAt: null,
        },
      });

    if (!expense) {
      throw new Error(
        "Expense not found"
      );
    }

    await expense.update({
      deletedAt: new Date(),
      status: "DELETED",
    });

    return {
      message:
        "Expense deleted successfully",
    };
  }
}

module.exports = new ExpenseService();