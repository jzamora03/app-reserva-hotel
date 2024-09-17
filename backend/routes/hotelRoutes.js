const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Obtener todos los hoteles
router.get('/', hotelController.getAllHotels);

// Agregar un nuevo hotel
router.post('/', hotelController.addHotel);

// Editar un hotel
router.put('/:id', hotelController.updateHotel);

// Eliminar un hotel
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;

