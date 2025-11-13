const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos de postgres establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos de postgres:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
