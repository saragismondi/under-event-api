const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      status: {
        type: DataTypes.ENUM(
          "Pending",
          "Approved",
          "Rejected",
        ),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
  );
};
