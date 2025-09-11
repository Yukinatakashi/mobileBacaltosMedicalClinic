// src/api/routes/login.route.js
const express = require('express');
const { loginUser } = require('../../handler/loginuser.js');

const router = express.Router();

router.post('/', loginUser);

module.exports = router;
