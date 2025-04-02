const jsonwebtoken = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/jwt.config');

const authMiddleware = (req, res, next) => {
    let token = req.headers['my-token'];
    if (!token) {
        res.status(401).json({ status: 'fail', message: 'Unauthorized!!, No Token Provided' })
    }
    try {
        jsonwebtoken.verify(token, ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json(err);
    }
}
module.exports = { authMiddleware };