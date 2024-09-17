// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Asegúrate de cargar las variables del entorno

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // o 'mariadb', dependiendo de la base de datos que estés usando
    port: process.env.DB_PORT
  }
);

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

module.exports = {
  sequelize,
  authenticateDB
};
