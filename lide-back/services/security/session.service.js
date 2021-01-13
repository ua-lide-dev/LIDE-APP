const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY;

const duration = '1h';

exports.getSession = async (username) => {
  return jwt.sign({username: username}, privateKey, {expiresIn: duration});
};

exports.validateSession = (session) => {
  try {
    const decodedSession = jwt.verify(session, privateKey);
    return decodedSession.username;
  } catch (error) {
    return false;
  }
};
