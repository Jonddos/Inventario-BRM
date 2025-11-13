module.exports = (sequelize, DataTypes) => {
  const PurchaseItem = sequelize.define(
    "PurchaseItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precioUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "purchase_items",
    }
  );

  return PurchaseItem;
};
