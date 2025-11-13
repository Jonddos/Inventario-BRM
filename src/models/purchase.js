module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    "Purchase",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "purchases",
    }
  );

  return Purchase;
};
