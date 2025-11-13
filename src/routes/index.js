const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const purchaseRoutes = require("./purchase.routes");

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/purchases", purchaseRoutes);

module.exports = router;
