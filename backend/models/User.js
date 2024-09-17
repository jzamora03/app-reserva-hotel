
// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/database');

// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   role: { // Agregar este campo
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: 'client', // Rol por defecto
//   },
// });

// module.exports = User;


const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
