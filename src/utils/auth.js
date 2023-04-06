const jwt = require('jsonwebtoken');

const secretkey = process.env.JWT_SECRET;

const configJWT = {
    expiresIn: '100d',
    algorithm: 'HS256',
};

const generateToken = (payload) => {
    const token = jwt.sign(payload, secretkey, configJWT);
    return token;
};

module.exports = {
    generateToken,
};
