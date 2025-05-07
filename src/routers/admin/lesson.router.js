'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const { lessonControllerAdmin } = require('../../controllers/admin/lesson.controller');
const router = express.Router();

router.get('/:lessonId', asyncHandler( lessonControllerAdmin._getOneLessonById ));
router.get('/all/:chapterId', asyncHandler( lessonControllerAdmin._getAllLesson ))
//---middleware authetication
router.use(authentication);

router.patch('/edit/:lessonId', asyncHandler( lessonControllerAdmin._editLesson ));
router.post('/create', asyncHandler( lessonControllerAdmin._createLesson ));

module.exports = router;