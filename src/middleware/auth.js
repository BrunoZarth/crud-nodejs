const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'your-private-key';

const tokenValidated = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, PRIVATE_KEY, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
};

module.exports = { PRIVATE_KEY, tokenValidated };