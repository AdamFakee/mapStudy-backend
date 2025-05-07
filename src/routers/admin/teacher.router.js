'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const { teacherController } = require('../../controllers/admin/teacher.controller');
const router = express.Router();

router.post('/login', asyncHandler( teacherController.login ));

//---middleware authetication
router.use(authentication);

router.post('/logout', asyncHandler( teacherController.logout ));


module.exports = router;