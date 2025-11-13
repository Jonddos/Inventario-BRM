const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Error interno del servidor",
  });
};

module.exports = errorHandler;
