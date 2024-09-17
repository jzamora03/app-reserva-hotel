const Hotel = require('../models/Hotel');

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    console.error('Error al obtener hoteles:', error);
    res.status(500).json({ message: 'Error al obtener hoteles' });
  }
};

exports.addHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    console.error('Error al agregar hotel:', error);
    res.status(500).json({ message: 'Error al agregar hotel' });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Hotel.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedHotel = await Hotel.findByPk(id);
      res.status(200).json(updatedHotel);
    } else {
      res.status(404).json({ message: 'Hotel no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar hotel:', error);
    res.status(500).json({ message: 'Error al actualizar hotel' });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Hotel.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Hotel no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar hotel:', error);
    res.status(500).json({ message: 'Error al eliminar hotel' });
  }
};
