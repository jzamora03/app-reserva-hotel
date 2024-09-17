// middleware/authorize.js
module.exports = (role) => (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      return next();
    }
    res.status(403).json({ msg: 'Acceso denegado' });
  };