const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Swagger
app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date(),
  });
});

// API Routes
// app.use("/api/v1/users", require("./routes/user.routes"));
// app.use("/api/v1/expenses", require("./routes/expense.routes"));
// app.use("/api/v1/balances", require("./routes/balance.routes"));
// app.use("/api/v1/activities", require("./routes/activity.routes"));

// 404 Handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;