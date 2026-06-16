const sequelize = require("../config/database");

const User = require("./user.model");
const Expense = require("./expense.model");
const ExpenseParticipant = require("./expense-participant.model");
const BalanceLedger = require("./balance-ledger.model");
const ActivityLog = require("./activity-log.model");

const db = {
  sequelize, // ← ye add karo
  User,
  Expense,
  ExpenseParticipant,
  BalanceLedger,
  ActivityLog,
};

require("./associations")(db);

module.exports = db;