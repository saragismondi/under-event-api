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
    place:{
      type: DataTypes.STRING,
     
    },
    

    title: {
      type: DataTypes.STRING,
     
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    performers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      // allowNull: false,
    },

    state:{
      type: DataTypes.STRING,
      
    },
    imagen: {
      type: DataTypes.STRING,
      
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    time: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    eventType: {
      type: DataTypes.STRING,
    },
  });
};
