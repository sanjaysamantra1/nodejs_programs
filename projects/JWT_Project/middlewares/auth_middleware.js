const jsonwebtoken = require('jsonwebtoken');

module.exports.authMiddleware = (req, res, next) => {
    let token = req.headers['my-token'];
    if (!token) {
        console.log('no token')
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
    }
    try {
        console.log( token);
        let user = jsonwebtoken.verify(token, JWT_KEY);
        req.user = user;
        next();
    } catch (error) {
        console.log('no token catch')
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
    }
};