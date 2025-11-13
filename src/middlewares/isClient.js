module.exports = (req, res, next) => {
    if (!req.user || req.user.role !== "CLIENT") {
        return res.status(403).json({
            message: "Solo los usuarios con rol CLIENT pueden realizar compras"
        });
    }
    next();
};
