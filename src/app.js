const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const routes = require("./routes/index.routes");

const app = express();

/**
 * =========================================
 * GLOBAL MIDDLEWARES
 * =========================================
 */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

/**
 * =========================================
 * SWAGGER
 * =========================================
 */

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/**
 * =========================================
 * HEALTH CHECK
 * =========================================
 */

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

/**
 * =========================================
 * API ROUTES
 * =========================================
 */

app.use("/api/v1", routes);

/**
 * =========================================
 * 404 HANDLER
 * =========================================
 */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * =========================================
 * GLOBAL ERROR HANDLER
 * =========================================
 */

app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

module.exports = app;