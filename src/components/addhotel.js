import React, { useState } from 'react';
import axios from 'axios';

const AddHotel = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rating: '',
    availableRooms: '',
    pricePerNight: ''
  });

  const { name, address, rating, availableRooms, pricePerNight } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/hotels', formData);
      console.log(res.data);
      // Manejar la respuesta después de agregar un nuevo hotel
    } catch (err) {
      console.error(err);
      // Manejar el error
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Agregar Nuevo Hotel</h2>
      <div>
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Nombre" required />
      </div>
      <div>
        <input type="text" name="address" value={address} onChange={onChange} placeholder="Dirección" required />
      </div>
      <div>
        <input type="number" name="rating" value={rating} onChange={onChange} placeholder="Calificación" required />
      </div>
      <div>
        <input type="number" name="availableRooms" value={availableRooms} onChange={onChange} placeholder="Habitaciones Disponibles" required />
      </div>
      <div>
        <input type="number" name="pricePerNight" value={pricePerNight} onChange={onChange} placeholder="Precio por Noche" required />
      </div>
      <button type="submit">Agregar Hotel</button>
    </form>
  );
};

export default AddHotel;
