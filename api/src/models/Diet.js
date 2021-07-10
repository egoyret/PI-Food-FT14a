const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo (tabla) diet. En la BD se va a llamar diets.
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    nombre: {
      type: DataTypes.STRING
    },
   

  });
};
