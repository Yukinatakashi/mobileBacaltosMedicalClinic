// src/api/routes/login.route.js
const express = require('express');
const { loginUser } = require('../handlers/loginuser.handler'); // Fixed path

const router = express.Router();

router.post('/', loginUser);

module.exports = router;