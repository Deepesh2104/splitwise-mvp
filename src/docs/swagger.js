const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Splitwise MVP API",
      version: "1.0.0",
      description: "Expense Sharing Backend API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },

  apis: [
    "./src/app.js"
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;