// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Hook para redireccionar

//   const { name, email, password } = formData;

//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     console.log('Datos del formulario:', formData);

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log('Respuesta del servidor:', res.data);
//       toast.success('¡Registro exitoso!'); // Mostrar toast de éxito
//       setError('');
//       setTimeout(() => {
//         navigate('/'); // Redirigir a la página de inicio
//       }, 2000); // Esperar 2 segundos para que el toast sea visible
//     } catch (err) {
//       console.error('Error:', err.response ? err.response.data : err.message);
//       setError('Error en el registro. Intenta de nuevo.');
//     }
//   };

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <h2>Register</h2>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <div>
//           <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
//         </div>
//         <div>
//           <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
//         </div>
//         <div>
//           <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       <ToastContainer />
//     </>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'; // Importa los estilos

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redireccionar

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Respuesta del servidor:', res.data);
      toast.success('¡Registro exitoso!'); // Mostrar toast de éxito
      setError('');
      setTimeout(() => {
        navigate('/'); // Redirigir a la página de inicio
      }, 2000); // Esperar 2 segundos para que el toast sea visible
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError('Error en el registro. Intenta de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onSubmit}>
        <h2>Registro de usuario</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
        </div>
        <div>
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
        </div>
        <div>
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
        </div>
        <button type="submit">Registrar</button>
        <button type="button" className="login-btn-back" onClick={() => navigate('/')}>
              Regresar
            </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;

