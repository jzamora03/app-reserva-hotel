// // src/components/Home.js

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css'; // Opcional: para los estilos específicos

// function Home() {
//   return (
//     <div className="home">
//       <h1>Bienvenido al sistema</h1>
//       <div className="button-container">
//         <Link to="/login" className="button">Iniciar Sesión</Link>
//         <Link to="/register" className="button">¿Aún no tienes cuenta? Regístrate</Link>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Opcional: para los estilos específicos
import backgroundImage from './images/fondo3.jpg'; // Importa la imagen

function Home() {
  return (
    <div className="home" style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover', // Asegura que la imagen cubra todo el contenedor
      backgroundPosition: 'center'
    }}>
      <div className="hero-section">
        <h1>Encuentra tu próximo destino</h1>
        <p>Descubre los mejores hoteles y reserva tu estancia con facilidad.</p>
        <div className="button-container">
          <Link to="/login" className="button">Iniciar Sesión</Link>
          <Link to="/register" className="button button-register">¿Aún no tienes cuenta? Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;