const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ExpenseParticipant = sequelize.define(
  "ExpenseParticipant",
  {
    expenseId: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "expense_id",
    },

    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "user_id",
    },

    shareAmount: {
      type: DataTypes.DECIMAL(18, 2),
      field: "share_amount",
    },

    sharePercentage: {
      type: DataTypes.DECIMAL(5, 2),
      field: "share_percentage",
    },
  },
  {
    tableName: "expense_participants",
    timestamps: false,
    underscored: true,
  }
);

module.exports = ExpenseParticipant;