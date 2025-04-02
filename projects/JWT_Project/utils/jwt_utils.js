const jsonwebtoken = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } = require('../config/jwt.config');

const generateAccessToken = function (userId,name) {
    return jsonwebtoken.sign({ userId, name},
        ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME });
}
const generateRefreshToken = function (userId,name) {
    return jsonwebtoken.sign({ userId,name },
        REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME });
}

function verifyToken(token, secret) {
    try {
        return jsonwebtoken.verify(token, secret);
    } catch (err) {
        return null;
    }
}
module.exports = {
    generateAccessToken, generateRefreshToken, verifyToken
}