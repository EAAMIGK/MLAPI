const express = require('express');

const authRouter = express.Router();

const { register, login } = require('../controllers/auth');

authRouter.post('/register', register); // http://localhost:3001/api/auth/register
authRouter.post('/login', login); // http://localhost:3001/api/auth/login

module.exports = authRouter;
