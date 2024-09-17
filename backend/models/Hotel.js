// models/Hotel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Hotel = sequelize.define('Hotel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availableRooms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pricePerNight: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Hotel;
