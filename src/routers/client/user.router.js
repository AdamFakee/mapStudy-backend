'use strict'

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { userController } = require('../../controllers/client/user.controller');
const { authentication } = require('../../middlewares/client/authentication.middleware');
const multer = require('../../configs/multer.config')();
const { uploadMedia } = require('../../middlewares/uploadToCloud.middleware');
const router = express.Router();

router.post('/login', asyncHandler( userController.login ));
router.post('/signup', asyncHandler( userController.signup ));

//---middleware authetication
router.use(authentication);

router.post('/logout', asyncHandler( userController.logout ));
router.get('/', asyncHandler( userController._getUserByEmail ));
router.patch('/editProfile', multer.single('avatar'), uploadMedia, asyncHandler( userController.editProfile ));


module.exports = router;