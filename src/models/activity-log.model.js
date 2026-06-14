const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },

    expenseId: {
      type: DataTypes.UUID,
      field: "expense_id",
    },

    actionType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "action_type",
    },

    metadata: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "activity_logs",
    timestamps: false,
    underscored: true,
  }
);

module.exports = ActivityLog;