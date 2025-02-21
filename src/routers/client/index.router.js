'use strict'

const express = require('express');
const router = express.Router();

router.use('/api/v1/user', require('./user.router'));
router.use('/api/v1/teacher', require('./teacher.router'));
router.use('/api/v1/course', require('./course.router'));

module.exports = router;