const express = require('express');
const { login } = require('../controllers/auth_controller');
const authRouter = express.Router();

authRouter.post('/login',login)

module.exports = authRouter;
