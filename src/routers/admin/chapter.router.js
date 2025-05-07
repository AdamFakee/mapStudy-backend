'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const { chapterControllerAdmin } = require('../../controllers/admin/chapter.controller');
const router = express.Router();

router.get('/:chapterId', asyncHandler( chapterControllerAdmin._getOneChapterById ));
router.get('/all/:courseId', asyncHandler( chapterControllerAdmin._getAllChapter ))
//---middleware authetication
router.use(authentication);

router.patch('/edit/:chapterId', asyncHandler( chapterControllerAdmin._editChapter ));
router.post('/create', asyncHandler( chapterControllerAdmin._createChapter ));

module.exports = router;