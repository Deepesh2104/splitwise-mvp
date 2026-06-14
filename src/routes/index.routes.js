const router = require("express").Router();

const userRoutes = require("./user.routes");
const expenseRoutes = require("./expense.routes");
const balanceRoutes = require("./balance.routes");
const activityRoutes = require("./activity.routes");

router.use("/users", userRoutes);
router.use("/expenses", expenseRoutes);
router.use("/balances", balanceRoutes);
router.use("/activities", activityRoutes);

module.exports = router;