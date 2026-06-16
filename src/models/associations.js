module.exports = (models) => {
  const {
    User,
    Expense,
    ExpenseParticipant,
    BalanceLedger,
    ActivityLog,
  } = models;

  /**
   * USER ↔ EXPENSE (PAID BY)
   */

  User.hasMany(Expense, {
    foreignKey: "paidByUserId",
    sourceKey: "id",
    as: "expensesPaid",
  });

  Expense.belongsTo(User, {
    foreignKey: "paidByUserId",
    targetKey: "id",
    as: "paidBy",
  });

  /**
   * USER ↔ EXPENSE (CREATED BY)
   */

  User.hasMany(Expense, {
    foreignKey: "createdByUserId",
    sourceKey: "id",
    as: "expensesCreated",
  });

  Expense.belongsTo(User, {
    foreignKey: "createdByUserId",
    targetKey: "id",
    as: "createdBy",
  });

  /**
   * EXPENSE ↔ EXPENSE PARTICIPANT
   */

  Expense.hasMany(ExpenseParticipant, {
    foreignKey: "expenseId",
    sourceKey: "id",
    as: "participants",
  });

  ExpenseParticipant.belongsTo(Expense, {
    foreignKey: "expenseId",
    targetKey: "id",
    as: "expense",
  });

  /**
   * USER ↔ EXPENSE PARTICIPANT
   */

  User.hasMany(ExpenseParticipant, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "expenseParticipations",
  });

  ExpenseParticipant.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "participant",
  });

  /**
   * EXPENSE ↔ BALANCE LEDGER
   */

  Expense.hasMany(BalanceLedger, {
    foreignKey: "expenseId",
    sourceKey: "id",
    as: "ledgerEntries",
  });

  BalanceLedger.belongsTo(Expense, {
    foreignKey: "expenseId",
    targetKey: "id",
    as: "expense",
  });

  /**
   * USER ↔ DEBITS
   */

  User.hasMany(BalanceLedger, {
    foreignKey: "debtorUserId",
    sourceKey: "id",
    as: "debits",
  });

  BalanceLedger.belongsTo(User, {
    foreignKey: "debtorUserId",
    targetKey: "id",
    as: "debtor",
  });

  /**
   * USER ↔ CREDITS
   */

  User.hasMany(BalanceLedger, {
    foreignKey: "creditorUserId",
    sourceKey: "id",
    as: "credits",
  });

  BalanceLedger.belongsTo(User, {
    foreignKey: "creditorUserId",
    targetKey: "id",
    as: "creditor",
  });

  /**
   * EXPENSE ↔ ACTIVITY LOG
   */

  Expense.hasMany(ActivityLog, {
    foreignKey: "expenseId",
    sourceKey: "id",
    as: "activities",
  });

  ActivityLog.belongsTo(Expense, {
    foreignKey: "expenseId",
    targetKey: "id",
    as: "expense",
  });

  /**
   * USER ↔ ACTIVITY LOG
   */

  User.hasMany(ActivityLog, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "activityLogs",
  });

  ActivityLog.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
  });
};