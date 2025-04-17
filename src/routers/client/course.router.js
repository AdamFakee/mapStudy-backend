'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { _getDetailCourse_contain_detailChapter, _getCoursesByOptions, _getAllCoursesByTeacherId, _getAllCourseByCategoryId, _getAllCourseBySearch, _getAllCourseBySearchMobile } = require('../../controllers/client/course.controller');
const router = express.Router();

router.get('/detail/:courseId', asyncHandler( _getDetailCourse_contain_detailChapter ));
router.get('/filter', asyncHandler( _getCoursesByOptions )); // pass req.query = { isNew or isHot }
router.get('/teacher/:teacherId', asyncHandler( _getAllCoursesByTeacherId ));
router.get('/category/:categoryId', asyncHandler( _getAllCourseByCategoryId )); 
router.get('/search', asyncHandler( _getAllCourseBySearch )); // pass req.query = filters, _class, page, limit, search  
router.get('/searchMobile', asyncHandler( _getAllCourseBySearchMobile )); // pass req.query = filters, _class, page, limit, search  

module.exports = router;