const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    createdByUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "created_by_user_id",
    },

    paidByUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "paid_by_user_id",
    },

    splitType: {
      type: DataTypes.ENUM(
        "EQUAL",
        "PERCENTAGE",
        "EXACT_AMOUNT"
      ),
      allowNull: false,
      field: "split_type",
    },

    expenseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "expense_date",
    },

    status: {
      type: DataTypes.ENUM(
        "ACTIVE",
        "DELETED"
      ),
      defaultValue: "ACTIVE",
    },

    deletedAt: {
      type: DataTypes.DATE,
      field: "deleted_at",
    },
  },
  {
    tableName: "expenses",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Expense;