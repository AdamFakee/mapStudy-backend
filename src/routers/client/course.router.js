'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { _getDetailCourse_contain_detailChapter, _getCoursesByOptions, _getAllCoursesByTeacherId } = require('../../controllers/client/course.controller');
const router = express.Router();

router.get('/detail/:courseId', asyncHandler( _getDetailCourse_contain_detailChapter ));
router.get('/filter', asyncHandler( _getCoursesByOptions )); // pass req.query = { isNew or isHot }
router.get('/teacher/:teacherId', asyncHandler( _getAllCoursesByTeacherId ));

module.exports = router;