// sync.js
const { sequelize } = require('./config/database');


const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Usa { force: true } solo si necesitas borrar datos existentes
    console.log('Base de datos sincronizada con éxito.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

syncDatabase();
