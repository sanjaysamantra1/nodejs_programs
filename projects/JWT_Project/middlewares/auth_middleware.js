const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/JWT_SECRET_KEY');

const authMiddleware = (req, res, next) => {
    let token = req.headers['my-token'];
    console.log(token)
    if (!token) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!, No Token Provided',
        });
    }
    try {
        let user = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json(error);
    }
};
module.exports = { authMiddleware };