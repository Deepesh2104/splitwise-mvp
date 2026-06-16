const router = require("express").Router();

const userRoutes = require("./user.routes");
const expenseRoutes = require("./expense.routes");

router.use("/users", userRoutes);
router.use("/expenses", expenseRoutes);

module.exports = router;