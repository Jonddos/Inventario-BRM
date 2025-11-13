module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define(
        "Invoice",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            number: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false,
            }
        },
        {
            tableName: "invoices",
        }
    );

    return Invoice;
};
