const express = require('express');
const { register, login, logout, refresh } = require('../controller/auth_controller');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);

module.exports = authRouter;
