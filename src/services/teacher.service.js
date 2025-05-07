'use strict';

const { teacherModel } = require("../models/teacher.model");

const getAllTeachers = async ( options ) => {
    const { limit = 20 } = options;
    return await teacherModel.findAll({
        where: {
            status: 'active'
        },
        raw: true,
        limit: Number(limit)
    })
}

const getTeacherById = async ( id ) => {
    return await teacherModel.findByPk(id, {
        where: {
            status: 'active'
        },
        raw: true
    });
}

const getTeacherByEmail = async ( email ) => {
    return await teacherModel.findOne({
        where: {
            email,
            status: 'active'
        },
        raw: true
    })
}
module.exports = {
    getAllTeachers, getTeacherById, getTeacherByEmail
}