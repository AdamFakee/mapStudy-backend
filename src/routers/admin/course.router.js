'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const { courseControllerAdmin } = require('../../controllers/admin/course.controller');
const router = express.Router();


router.get('/:courseId', asyncHandler( courseControllerAdmin._getOneCourseById ));
router.get('/create/relational', asyncHandler ( courseControllerAdmin._getRelationalForCourse ));
//---middleware authetication
router.use(authentication);

router.get('/', asyncHandler( courseControllerAdmin._getAllCourseByTeacherId ))
router.patch('/edit/:courseId', asyncHandler( courseControllerAdmin._editCourse ));
router.post('/create', asyncHandler( courseControllerAdmin._createCourse ));
router.delete('/delete/:courseId', asyncHandler( courseControllerAdmin._deleteCourseById))
module.exports = router;