const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { swaggerUi, swaggerSpec } = require("./config/swagger");


const { connectDB } = require("./config/database");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "API Inventario funcionando Correctamente" });
});

app.use("/api", routes);

app.use(errorHandler);

connectDB().then(() => {
  const db = require("./models");
  db.sequelize.sync({ alter: false }).then(() => {
    console.log("Modelos sincronizados con la base de datos");
  });
});

module.exports = app;
