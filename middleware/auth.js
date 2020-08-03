const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Checks the header to see if this person has token
  const token = req.header('x-auth-token');

  // If there is no token, display an error message
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verifies the token by decoding the thing
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    req.user = decoded.user;
    // assigning the 'req.user' variable to the user from the token.
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
