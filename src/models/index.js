const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Product = require("./product")(sequelize, DataTypes);
db.Purchase = require("./purchase")(sequelize, DataTypes);
db.PurchaseItem = require("./purchaseItem")(sequelize, DataTypes);
db.Invoice = require("./invoice")(sequelize, DataTypes);

db.User.hasMany(db.Purchase, { foreignKey: "userId" });
db.Purchase.belongsTo(db.User, { foreignKey: "userId" });

db.Purchase.hasMany(db.PurchaseItem, { foreignKey: "purchaseId" });
db.PurchaseItem.belongsTo(db.Purchase, { foreignKey: "purchaseId" });

db.Product.hasMany(db.PurchaseItem, { foreignKey: "productId" });
db.PurchaseItem.belongsTo(db.Product, { foreignKey: "productId" });

db.Purchase.hasOne(db.Invoice, { foreignKey: "purchaseId" });
db.Invoice.belongsTo(db.Purchase, { foreignKey: "purchaseId" });

db.User.hasMany(db.Invoice, { foreignKey: "userId" });
db.Invoice.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
