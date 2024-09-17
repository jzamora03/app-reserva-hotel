const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { sequelize, authenticateDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');

const app = express();

// Conectar a la base de datos
authenticateDB();

// Configurar CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:3000', // Asegúrate de que este sea el origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Permite el envío de cookies
}));

// Configurar express-session
app.use(session({
  secret: 'root1234', // Cambia esto por una clave secreta segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia a `true` si usas HTTPS
}));

// Middleware para parsear el body de las requests
app.use(express.json());

// Definir rutas
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

