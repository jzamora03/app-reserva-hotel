// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// const Dashboard = () => {
//   const [hotels, setHotels] = useState([]);
//   const [newHotel, setNewHotel] = useState({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
//   const [editingHotel, setEditingHotel] = useState(null); // Estado para manejar edición
//   const [loading, setLoading] = useState(false); // Estado para manejar el loading
//   const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await fetch('http://192.168.1.24:5000/api/hotels');
//         if (response.ok) {
//           const data = await response.json();
//           setHotels(data);
//         } else {
//           console.error('Error al obtener los hoteles');
//         }
//       } catch (err) {
//         console.error('Error:', err);
//       }
//     };

//     fetchHotels();
//   }, []);

//   const handleAddHotel = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://192.168.1.24:5000/api/hotels', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newHotel),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setHotels([...hotels, data]);
//         setModalOpen(false); // Cerrar el modal después de agregar el hotel
//         setNewHotel({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' }); // Limpiar el formulario
//       } else {
//         console.error('Error al agregar hotel:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error de red:', error);
//     }
//   };

//   const handleEditHotel = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`http://192.168.1.24:5000/api/hotels/${editingHotel.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editingHotel),
//       });
//       if (response.ok) {
//         const updatedHotel = await response.json();
//         setHotels(hotels.map(hotel => (hotel.id === editingHotel.id ? updatedHotel : hotel)));
//         setEditingHotel(null);
//         setModalOpen(false);
//       } else {
//         console.error('Error al editar el hotel');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   const handleDeleteHotel = async (id) => {
//     try {
//       const response = await fetch(`http://192.168.1.24:5000/api/hotels/${id}`, { method: 'DELETE' });
//       if (response.ok) {
//         setHotels(hotels.filter(hotel => hotel.id !== id));
//       } else {
//         console.error('Error al eliminar el hotel');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingHotel) {
//       setEditingHotel({ ...editingHotel, [name]: value });
//     } else {
//       setNewHotel({ ...newHotel, [name]: value });
//     }
//   };

//   const openEditModal = (hotel) => {
//     setEditingHotel(hotel);
//     setModalOpen(true);
//   };

//   const handleLogout = () => {
//     setLoading(true); // Mostrar el spinner y mensaje
//     // Espera 3 segundos antes de redirigir
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       navigate('/');
//     }, 3000);
//   };

//   return (
//     <div className="dashboard">
//       {loading ? (
//         <div className="loading-screen">
//           <p>Cerrando sesión...</p>
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <>
//           <header className="dashboard-header">
//             <h2>Bienvenido a Génnesis</h2>
//             <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
//           </header>

//           <button className="add-hotel-button" onClick={() => setModalOpen(true)}>
//             <FaPlus /> Agregar Hotel
//           </button>

//           {modalOpen && (
//             <div className="modal">
//               <div className="modal-content">
//                 <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
//                 <h3>{editingHotel ? 'Editar Hotel' : 'Agregar Hotel'}</h3>
//                 <form onSubmit={editingHotel ? handleEditHotel : handleAddHotel}>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Nombre"
//                     value={editingHotel ? editingHotel.name : newHotel.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Dirección"
//                     value={editingHotel ? editingHotel.address : newHotel.address}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="number"
//                     name="rating"
//                     placeholder="Calificación"
//                     value={editingHotel ? editingHotel.rating : newHotel.rating}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="number"
//                     name="availableRooms"
//                     placeholder="Habitaciones Disponibles"
//                     value={editingHotel ? editingHotel.availableRooms : newHotel.availableRooms}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <input
//                     type="number"
//                     name="pricePerNight"
//                     placeholder="Precio por Noche"
//                     value={editingHotel ? editingHotel.pricePerNight : newHotel.pricePerNight}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <button type="submit">{editingHotel ? 'Actualizar' : 'Agregar'}</button>
//                   {editingHotel && <button type="button" onClick={() => setEditingHotel(null)}>Cancelar</button>}
//                 </form>
//               </div>
//             </div>
//           )}

//           <table>
//             <thead>
//               <tr>
//                 <th>Nombre</th>
//                 <th>Dirección</th>
//                 <th>Calificación</th>
//                 <th>Habitaciones Disponibles</th>
//                 <th>Precio por Noche</th>
//                 <th>Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               {hotels.map((hotel) => (
//                 <tr key={hotel.id}>
//                   <td>{hotel.name}</td>
//                   <td>{hotel.address}</td>
//                   <td>{hotel.rating}</td>
//                   <td>{hotel.availableRooms}</td>
//                   <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(hotel.pricePerNight)}</td>
//                   <td>
//                     <button className="action-button" onClick={() => openEditModal(hotel)}>
//                       <FaEdit />
//                     </button>
//                     <button className="action-button" onClick={() => handleDeleteHotel(hotel.id)}>
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// const Dashboard = () => {
//   const [hotels, setHotels] = useState([]);
//   const [newHotel, setNewHotel] = useState({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
//   const [editingHotel, setEditingHotel] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [userName, setUserName] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await fetch('http://192.168.1.24:5000/api/hotels');
//         if (response.ok) {
//           const data = await response.json();
//           setHotels(data);
//         } else {
//           console.error('Error al obtener los hoteles');
//         }
//       } catch (err) {
//         console.error('Error:', err);
//       }
//     };

//     fetchHotels();
//   }, []);

//   const handleAddHotel = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://192.168.1.24:5000/api/hotels', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newHotel),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setHotels([...hotels, data]);
//         setModalOpen(false);
//         setNewHotel({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
//       } else {
//         console.error('Error al agregar hotel:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error de red:', error);
//     }
//   };

//   const handleEditHotel = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`http://192.168.1.24:5000/api/hotels/${editingHotel.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editingHotel),
//       });
//       if (response.ok) {
//         const updatedHotel = await response.json();
//         setHotels(hotels.map(hotel => (hotel.id === editingHotel.id ? updatedHotel : hotel)));
//         setEditingHotel(null);
//         setModalOpen(false);
//       } else {
//         console.error('Error al editar el hotel');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   const handleDeleteHotel = async (id) => {
//     try {
//       const response = await fetch(`http://192.168.1.24:5000/api/hotels/${id}`, { method: 'DELETE' });
//       if (response.ok) {
//         setHotels(hotels.filter(hotel => hotel.id !== id));
//       } else {
//         console.error('Error al eliminar el hotel');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingHotel) {
//       setEditingHotel({ ...editingHotel, [name]: value });
//     } else {
//       setNewHotel({ ...newHotel, [name]: value });
//     }
//   };

//   const openAddHotelModal = () => {
//     setNewHotel({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
//     setEditingHotel(null);
//     setModalOpen(true);
//   };

//   const openEditHotelModal = (hotel) => {
//     setEditingHotel(hotel);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setEditingHotel(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate('/');
//   };

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h2>Bienvenido {userName}</h2>
//         <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
//       </div>

//       <button className="add-hotel-button" onClick={openAddHotelModal}><FaPlus /> Agregar Hotel</button>

//       {loading && (
//         <div className="loading-screen">
//           <p>Iniciando sesión...</p>
//           <div className="spinner"></div>
//         </div>
//       )}

//       <div className="hotels-card-container">
//         {hotels.map((hotel) => (
//           <div key={hotel.id} className="hotel-card">
//             <img src={hotel.image || 'https://via.placeholder.com/300'} alt={hotel.name} />
//             <h3>{hotel.name}</h3>
//             <p><strong>Dirección:</strong> {hotel.address}</p>
//             <p><strong>Calificación:</strong> {hotel.rating}</p>
//             <p><strong>Habitaciones Disponibles:</strong> {hotel.availableRooms}</p>
//             <p className="hotel-price">{hotel.pricePerNight.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} por noche</p>
//             <div className="action-buttons">
//               <button onClick={() => openEditHotelModal(hotel)}><FaEdit /> Editar</button>
//               <button onClick={() => handleDeleteHotel(hotel.id)}><FaTrash /> Eliminar</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={closeModal}>&times;</span>
//             <h2>{editingHotel ? 'Editar Hotel' : 'Agregar Hotel'}</h2>
//             <form onSubmit={editingHotel ? handleEditHotel : handleAddHotel}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Nombre del Hotel"
//                 value={editingHotel ? editingHotel.name : newHotel.name}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Dirección"
//                 value={editingHotel ? editingHotel.address : newHotel.address}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="number"
//                 name="rating"
//                 placeholder="Calificación"
//                 value={editingHotel ? editingHotel.rating : newHotel.rating}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="number"
//                 name="availableRooms"
//                 placeholder="Habitaciones Disponibles"
//                 value={editingHotel ? editingHotel.availableRooms : newHotel.availableRooms}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="number"
//                 name="pricePerNight"
//                 placeholder="Precio por Noche"
//                 value={editingHotel ? editingHotel.pricePerNight : newHotel.pricePerNight}
//                 onChange={handleInputChange}
//                 required
//               />
//               <button type="submit">{editingHotel ? 'Actualizar' : 'Agregar'}</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';
// import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';

// const Dashboard = () => {
//   const [hotels, setHotels] = useState([]);
//   const [newHotel, setNewHotel] = useState({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
//   const [editingHotel, setEditingHotel] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [userName, setUserName] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await fetch('http://192.168.1.24:5000/api/hotels');
//         if (response.ok) {
//           const data = await response.json();
//           setHotels(data);
//         } else {
//           console.error('Error al obtener los hoteles');
//         }
//       } catch (err) {
//         console.error('Error:', err);
//       }
//     };

//     fetchHotels();
//   }, []);

//   const handleAddHotel = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://192.168.1.24:5000/api/hotels', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newHotel),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setHotels([...hotels, data]);
//         setModalOpen(false);
//         setNewHotel({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
//       } else {
//         console.error('Error al agregar hotel:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error de red:', error);
//     }
//   };

//   const handleEditHotel = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`http://192.168.1.24:5000/api/hotels/${editingHotel.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editingHotel),
//       });
//       if (response.ok) {
//         const updatedHotel = await response.json();
//         setHotels(hotels.map(hotel => (hotel.id === editingHotel.id ? updatedHotel : hotel)));
//         setEditingHotel(null);
//         setModalOpen(false);
//       } else {
//         console.error('Error al editar el hotel');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   const handleDeleteHotel = async (id) => {
//     try {
//       const response = await fetch(`http://192.168.1.24:5000/api/hotels/${id}`, { method: 'DELETE' });
//       if (response.ok) {
//         setHotels(hotels.filter(hotel => hotel.id !== id));
//       } else {
//         console.error('Error al eliminar el hotel');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingHotel) {
//       setEditingHotel({ ...editingHotel, [name]: value });
//     } else {
//       setNewHotel({ ...newHotel, [name]: value });
//     }
//   };

//   const openAddHotelModal = () => {
//     setNewHotel({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
//     setEditingHotel(null);
//     setModalOpen(true);
//   };

//   const openEditHotelModal = (hotel) => {
//     setEditingHotel(hotel);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setEditingHotel(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate('/');
//   };

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h2>Bienvenido {userName}</h2>
//         <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
//       </div>

//       <button className="add-hotel-button" onClick={openAddHotelModal}><FaPlus /> Agregar Hotel</button>

//       {loading && (
//         <div className="loading-screen">
//           <p>Iniciando sesión...</p>
//           <div className="spinner"></div>
//         </div>
//       )}

//       <div className="hotels-card-container">
//         {hotels.map((hotel) => (
//           <div key={hotel.id} className="hotel-card">
//             <img src={hotel.image || 'https://via.placeholder.com/300'} alt={hotel.name} />
//             <h3>{hotel.name}</h3>
//             <p><strong>Dirección:</strong> {hotel.address}</p>
//             <p><strong>Calificación:</strong> {hotel.rating}</p>
//             <p><strong>Habitaciones Disponibles:</strong> {hotel.availableRooms}</p>
//             <p className="hotel-price">{hotel.pricePerNight.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} por noche</p>
//             <div className="availability-buttons">
//               {hotel.availableRooms >= 1 ? (
//                 <button className="available-button">Disponible</button>
//               ) : (
//                 <button className="not-available-button">No disponible</button>
//               )}
//             </div>
//             <div className="action-buttons">
//               <button onClick={() => openEditHotelModal(hotel)}><FaEdit /> Editar</button>
//               <button onClick={() => handleDeleteHotel(hotel.id)}><FaTrash /> Eliminar</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={closeModal}>&times;</span>
//             <h2>{editingHotel ? 'Editar Hotel' : 'Agregar Hotel'}</h2>
//             <form onSubmit={editingHotel ? handleEditHotel : handleAddHotel}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Nombre del Hotel"
//                 value={editingHotel ? editingHotel.name : newHotel.name}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Dirección"
//                 value={editingHotel ? editingHotel.address : newHotel.address}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="number"
//                 name="rating"
//                 placeholder="Calificación"
//                 value={editingHotel ? editingHotel.rating : newHotel.rating}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="number"
//                 name="availableRooms"
//                 placeholder="Habitaciones Disponibles"
//                 value={editingHotel ? editingHotel.availableRooms : newHotel.availableRooms}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="number"
//                 name="pricePerNight"
//                 placeholder="Precio por Noche"
//                 value={editingHotel ? editingHotel.pricePerNight : newHotel.pricePerNight}
//                 onChange={handleInputChange}
//                 required
//               />
//               <button type="submit">{editingHotel ? 'Actualizar' : 'Agregar'}</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


//ULTIMA VERSION
///////////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import StarRating from '../components/StarRating'; // Importa el componente de estrellas

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
  const [editingHotel, setEditingHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://192.168.1.24:5000/api/hotels');
        if (response.ok) {
          const data = await response.json();
          setHotels(data);
        } else {
          console.error('Error al obtener los hoteles');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchHotels();
  }, []);

  const handleAddHotel = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://192.168.1.24:5000/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHotel),
      });

      if (response.ok) {
        const data = await response.json();
        setHotels([...hotels, data]);
        setModalOpen(false);
        setNewHotel({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
      } else {
        console.error('Error al agregar hotel:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleEditHotel = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://192.168.1.24:5000/api/hotels/${editingHotel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingHotel),
      });
      if (response.ok) {
        const updatedHotel = await response.json();
        setHotels(hotels.map(hotel => (hotel.id === editingHotel.id ? updatedHotel : hotel)));
        setEditingHotel(null);
        setModalOpen(false);
      } else {
        console.error('Error al editar el hotel');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDeleteHotel = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.24:5000/api/hotels/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setHotels(hotels.filter(hotel => hotel.id !== id));
      } else {
        console.error('Error al eliminar el hotel');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingHotel) {
      setEditingHotel({ ...editingHotel, [name]: value });
    } else {
      setNewHotel({ ...newHotel, [name]: value });
    }
  };

  const openAddHotelModal = () => {
    setNewHotel({ name: '', address: '', rating: '', availableRooms: '', pricePerNight: '' });
    setEditingHotel(null);
    setModalOpen(true);
  };

  const openEditHotelModal = (hotel) => {
    setEditingHotel(hotel);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingHotel(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Bienvenido {userName}</h2>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      <button className="add-hotel-button" onClick={openAddHotelModal}><FaPlus /> Agregar Hotel</button>

      {loading && (
        <div className="loading-screen">
          <p>Iniciando sesión...</p>
          <div className="spinner"></div>
        </div>
      )}

      <div className="hotels-card-container">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image || 'https://via.placeholder.com/300'} alt={hotel.name} />
            <h3>{hotel.name}</h3>
            <p><strong>Dirección:</strong> {hotel.address}</p>
            <p><strong>Calificación:</strong> <StarRating rating={hotel.rating} /></p>
            <p><strong>Habitaciones Disponibles:</strong> {hotel.availableRooms}</p>
            <p className="hotel-price">{hotel.pricePerNight.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} por noche</p>
            <div className="availability-buttons">
              {hotel.availableRooms >= 1 ? (
                <button className="available-button">Disponible</button>
              ) : (
                <button className="not-available-button">No disponible</button>
              )}
            </div>
            <div className="action-buttons">
              <button onClick={() => openEditHotelModal(hotel)}><FaEdit /> Editar</button>
              <button onClick={() => handleDeleteHotel(hotel.id)}><FaTrash /> Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{editingHotel ? 'Editar Hotel' : 'Agregar Hotel'}</h2>
            <form onSubmit={editingHotel ? handleEditHotel : handleAddHotel}>
              <input
                type="text"
                name="name"
                placeholder="Nombre del Hotel"
                value={editingHotel ? editingHotel.name : newHotel.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                value={editingHotel ? editingHotel.address : newHotel.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="rating"
                placeholder="Calificación"
                value={editingHotel ? editingHotel.rating : newHotel.rating}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="availableRooms"
                placeholder="Habitaciones Disponibles"
                value={editingHotel ? editingHotel.availableRooms : newHotel.availableRooms}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="pricePerNight"
                placeholder="Precio por Noche"
                value={editingHotel ? editingHotel.pricePerNight : newHotel.pricePerNight}
                onChange={handleInputChange}
                required
              />
              <button type="submit">{editingHotel ? 'Actualizar' : 'Agregar'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


