'use strict';

const { OK, NoContent } = require("../../core/success.response");
const { getAllTeachers, getTeacherById } = require("../../services/teacher.service");
const { getInfoData } = require("../../utils/object.util");

const _getAllTeachers = async ( req, res, next ) => {
    const teachers = await getAllTeachers(req.query);
    if( teachers.length === 0 ) return new NoContent().send(res);
    
    const fields = [ 'name', 'thumbnail' ];
    const metadata = { teachers: getInfoData({ fields, object: teachers }) };
    return new OK({ metadata }).send(res);
}

const _getTeacherById = async ( req, res, next ) => {
    const { id } = req.params;
    const teacher = await getTeacherById(id);
    if( !teacher ) return new NoContent().send(res);
    
    const fields = [ 'name', 'thumbnail', 'infor' ];
    const metadata = { teacher: getInfoData({ fields, object: teacher }) };
    return new OK({ metadata }).send(res);
}

module.exports = {
    _getAllTeachers,
    _getTeacherById,
}