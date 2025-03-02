'use strict';

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { _getChapterById } = require('../../controllers/client/chapter.controller');
const accessCoursePermission = require('../../middlewares/client/accessCoursePermission.middleware');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const router = express.Router();

//----------------- check auth -------------------//
router.use(authentication)
//----------------- check permison -------------------//
router.use(accessCoursePermission);

router.get('/:chapterId', asyncHandler(_getChapterById ));

module.exports = router;