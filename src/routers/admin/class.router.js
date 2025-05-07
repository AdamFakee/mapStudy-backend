'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const { classControllerAdmin } = require('../../controllers/admin/class.controller');
const router = express.Router();

router.get('/:classId', asyncHandler( classControllerAdmin._getOneClassById ));
router.get('/', asyncHandler( classControllerAdmin._getAllClass ))
//---middleware authetication
router.use(authentication);

router.patch('/edit/:classId', asyncHandler( classControllerAdmin._editClass ));
router.post('/create', asyncHandler( classControllerAdmin._createClass ));
router.delete('/delete/:classId', asyncHandler( classControllerAdmin._deleteClassById))

module.exports = router;