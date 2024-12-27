const jsonwebtoken = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET } = require("../config/JWT_SECRET_KEY");

const generateAccessToken = (user) => {
    return jsonwebtoken.sign({ userId: user._id, name: user.name }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
};

const generateRefreshToken = (user) => {
    return jsonwebtoken.sign({ userId: user._id, name: user.name }, REFRESH_TOKEN_SECRET, { expiresIn: '2m' });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
}