const express = require('express');
const { register, login, refreshToken, logout } = require('../controllers/auth_controller');

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/refreshToken', refreshToken)
authRouter.post('/logout', logout)

module.exports = authRouter;