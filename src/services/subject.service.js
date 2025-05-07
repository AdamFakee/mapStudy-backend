const { subjectModel } = require("../models/subject.model")


const getOneSubjectById = async (id) => {
    return await subjectModel.findOne({
        where: {
            id: id,
            status: 'active'
        },
        raw: true
    })
}

const getAllSubject = async () => {
    return await subjectModel.findAll({
        where: {
            status: 'active'
        },
        raw: true
    })
}

const editSubject = async (payload, subjectId) => {
    return await subjectModel.update(payload, {
        where: { 
            id: subjectId, status: 'active'
        },
        raw: true
    });
}

const createSubject = async ( payload ) => {
    return await subjectModel.create(payload);
}


const deleteSubjectById = async (subjectId) => {
    return await subjectModel.update({
        status: 'inactive'
    },{
        where: {
          id: subjectId,
        },
        raw: true
    });
}

module.exports = {
    getOneSubjectById, getAllSubject, deleteSubjectById, editSubject, createSubject
}