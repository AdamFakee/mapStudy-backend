'use strict';

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { _getAllTeachers, _getTeacherById } = require('../../controllers/client/teacher.controller');
const router = express.Router();

router.get('/getAllTeachers', asyncHandler( _getAllTeachers ));
router.get('/getTeacherById/:id', asyncHandler( _getTeacherById ));

module.exports = router;