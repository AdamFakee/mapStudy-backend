'use strict';

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { _getAllCategories, _getOneCategoryById } = require('../../controllers/client/category.controller');
const router = express.Router();

router.get('/', asyncHandler( _getAllCategories ));
router.get('/detail/:id', asyncHandler( _getOneCategoryById ));

module.exports = router;