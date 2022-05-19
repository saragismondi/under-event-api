const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Event", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },

    imagen: {
      type: DataTypes.STRING(1000),
    },
    city: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      // allowNull: false,
    },

    description: {
      type: DataTypes.STRING(1000),
    },
    genero: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    cost: {
      type: DataTypes.STRING,
    },
    // costTwo: {
    //   type: DataTypes.STRING,
    // },
    month: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.FLOAT,
      //allowNull: true,
    },
    long: {
      type: DataTypes.FLOAT,
      //allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
