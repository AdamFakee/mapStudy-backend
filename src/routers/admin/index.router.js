'use strict'

const express = require('express');
const router = express.Router();

router.use('/api/v1/teacher', require('./teacher.router'));
router.use('/api/v1/course', require('./course.router'));
router.use('/api/v1/subject', require('./subject.router'));
router.use('/api/v1/class', require('./class.router'));
router.use('/api/v1/chapter', require('./chapter.router'));
router.use('/api/v1/lesson', require('./lesson.router'));

module.exports = router;