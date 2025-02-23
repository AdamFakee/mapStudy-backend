'use strict';

const { NoContent, OK } = require("../../core/success.response");
const { getAllCategories, getOneCategoryById } = require("../../services/category.service");

const _getAllCategories = async ( req, res, next ) => {
    const categories = await getAllCategories( req.query );
    if( categories.length === 0 ) return new NoContent({}).send(res);
    
    const metadata = { categories };
    return new OK({ metadata }).send(res);
}

const _getOneCategoryById = async ( req, res, next ) => {
    const { id } = req.params;
    const category = await getOneCategoryById(id);
    if(!category) return new NoContent({}).send(res);
    
    const metadata = { category };
    return new OK({ metadata }).send(res);
}
module.exports = {
    _getAllCategories, _getOneCategoryById
};