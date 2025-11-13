const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Product = require("./product")(sequelize, DataTypes);
db.Purchase = require("./purchase")(sequelize, DataTypes);
db.PurchaseItem = require("./purchaseItem")(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Purchase, { foreignKey: "userId" });
db.Purchase.belongsTo(db.User, { foreignKey: "userId" });

db.Purchase.hasMany(db.PurchaseItem, { foreignKey: "purchaseId" });
db.PurchaseItem.belongsTo(db.Purchase, { foreignKey: "purchaseId" });

db.Product.hasMany(db.PurchaseItem, { foreignKey: "productId" });
db.PurchaseItem.belongsTo(db.Product, { foreignKey: "productId" });

module.exports = db;
