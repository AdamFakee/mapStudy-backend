'use strict';

const { categoryModel } = require("../models/category.model");

const getAllCategories = async ( opts ) => {
    const { limit = 10 } = opts;
    return await categoryModel.findAll({
        where: {
            status: 'active'
        },
        raw: true,
        limit: Number(limit)
    })
}

const getOneCategoryById = async ( categoryId ) => {
    return await categoryModel.findByPk(categoryId, {
        where: {
            status: 'active'
        },
        raw: true
    })
}

module.exports = {
    getAllCategories, getOneCategoryById
}