'use strict'

const express = require('express');
const router = express.Router();

router.use('/api/v1/user', require('./user.router'));

module.exports = router;