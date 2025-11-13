module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Se requiere rol ADMIN." });
  }
  next();
};
