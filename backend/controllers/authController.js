const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Crear un nuevo usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPassword });

    // Crear y devolver el token JWT
    const payload = { user: { id: newUser.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Error en el servidor:', err.message);
    res.status(500).send('Error en el servidor');
  }
};


// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales no válidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales no válidas' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};


// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error en el servidor' });
//   }
// };

// module.exports = { login };
