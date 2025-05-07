const { OK } = require("../../core/success.response");
const { getAllSubject, getOneSubjectById, editSubject, createSubject, deleteSubjectById } = require("../../services/subject.service")

const _getAllSubject = async (req, res, next) => {
    const subjects = await getAllSubject();
    const metadata = {
        subjects: subjects
    }

    return new OK({metadata}).send(res);
}

const _getOneSubjectById = async (req, res, next) => {
    const {subjectId } = req.params;
    const subject = await getOneSubjectById(subjectId);
    const metadata = {
        subject: subject
    }

    return new OK({metadata}).send(res);
}

const _editSubject = async (req, res, next) => {
    const payload = req.body;
    const {subjectId } = req.params;

    const result = await editSubject(payload, subjectId);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}

const _createSubject = async (req, res, next) => {
    const payload = req.body;
    const result = await createSubject(payload);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}


const _deleteSubjectById = async (req, res, next) => {
    const {subjectId } = req.params;
    const result = await deleteSubjectById(subjectId);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}

module.exports.subjectControllerAdmin = {
    _createSubject, _deleteSubjectById, _editSubject, _getAllSubject, _getOneSubjectById
}