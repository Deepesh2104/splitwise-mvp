const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BalanceLedger = sequelize.define(
  "BalanceLedger",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },

    expenseId: {
      type: DataTypes.UUID,
      field: "expense_id",
    },

    debtorUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "debtor_user_id",
    },

    creditorUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "creditor_user_id",
    },

    amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
  },
  {
    tableName: "balance_ledgers",
    timestamps: false,
    underscored: true,
  }
);

module.exports = BalanceLedger;