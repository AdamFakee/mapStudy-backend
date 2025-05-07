const { classModel } = require("../models/class.model")


const getOneClassById = async (id) => {
    return await classModel.findOne({
        where: {
            id: id,
            status: 'active'
        },
        raw: true
    })
}

const getAllClasses = async () => {
    return await classModel.findAll({
        where: {
            status: 'active'
        },
        raw: true
    })
}

const editClass = async (payload, classId) => {
    return await classModel.update(payload, {
        where: { 
            id: classId, status: 'active'
        },
        raw: true
    });
}

const createClass = async ( payload ) => {
    return await classModel.create(payload);
}


const deleteClassById = async (classId) => {
    return await classModel.update({
        status: 'inactive'
    },{
        where: {
          id: classId,
        },
        raw: true
    });
}

module.exports = {
    getOneClassById, getAllClasses, editClass, deleteClassById, createClass
}