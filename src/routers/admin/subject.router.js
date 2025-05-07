'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const { subjectControllerAdmin } = require('../../controllers/admin/subject.controller');
const router = express.Router();

router.get('/:subjectId', asyncHandler( subjectControllerAdmin._getOneSubjectById ));
router.get('/', asyncHandler( subjectControllerAdmin._getAllSubject ))
//---middleware authetication
router.use(authentication);

router.patch('/edit/:subjectId', asyncHandler( subjectControllerAdmin._editSubject ));
router.post('/create', asyncHandler( subjectControllerAdmin._createSubject ));
router.delete('/delete/:subjectId', asyncHandler( subjectControllerAdmin._deleteSubjectById))

module.exports = router;