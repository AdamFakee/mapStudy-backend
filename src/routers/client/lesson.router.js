'use strict';

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const accessCoursePermission = require('../../middlewares/client/accessCoursePermission.middleware');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const { _getLessonById } = require('../../controllers/client/lesson.controller');
const router = express.Router();

//----------------- check auth -------------------//
router.use(authentication)
//----------------- check permison -------------------//
router.use(accessCoursePermission);

router.get('/:lessonId', asyncHandler( _getLessonById ));

module.exports = router;