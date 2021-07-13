// Aqui creamos el modelo (tabla) recipe. en la BD se va a llamar recipes.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING
    },
    resumen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puntuacion: {
      type: DataTypes.INTEGER,
      set(value) { this.setDataValue('puntuacion', !value ? 0 : value)}
    },
    nivel: {
      type: DataTypes.INTEGER,
      set(value) { this.setDataValue('nivel', !value ? 0 : value)}
    },
    instrucciones: {
      type: DataTypes.TEXT,
    }

  });
};

// Si no le defino un primary key, sequelize crea un id de type integer autonum
// Opcion para poner un id que no se choque con el que viene d ela API usand UUID.
// Previamente hay que instalar el UUID haciendo: npm install uuid
// Y luego para usarlo en donde hago la tuta de post, debiera importalo asi:
// const { v4: uuidv4 } = require('uuid')
// y para usarlo (crear un nuevo uuid) haria: id: uuidv4()
//
//{
//  id: {
//    type: DataTypes.UUID,
//    allowNull: false,
//    primaryKey: true,
//
//  }
//}
