'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const { _createEnrollment, _isAccess } = require('../../controllers/client/enrollment.controller');
const accessCoursePermission = require('../../middlewares/client/accessCoursePermission.middleware');
const router = express.Router();


// check authentication 
router.use(authentication)

router.post('/create', asyncHandler(_createEnrollment))

//----------------- check permison -------------------//
router.use(accessCoursePermission);
router.get('/isAcess', asyncHandler(_isAccess)); // kiểm tra xem đc truy cập khóa học hay k
module.exports = router;