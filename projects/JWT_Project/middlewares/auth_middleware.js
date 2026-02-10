const jsonwebtoken = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/jwt.config');
const { verifyToken } = require('../utils/jwt_utils');

const authMiddleware = (req, res, next) => {
    console.log('inside auth middleware')
    let token = req.headers['my-token'];
    if (!token) {
        res.status(401).json({ status: 'fail', message: 'Unauthorized!!, No Token Provided' })
    }
    try {
        console.log(token, ACCESS_TOKEN_SECRET)
        const user = verifyToken(token, ACCESS_TOKEN_SECRET);
        req.user = user;
        console.log('auth middleware', req.user)
        next();
    } catch (err) {
        res.status(401).json(err);
    }
}
module.exports = { authMiddleware };