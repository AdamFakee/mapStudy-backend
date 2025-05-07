const { OK } = require("../../core/success.response");
const { getAllClasses, editClass, createClass, deleteClassById } = require("../../services/class.service");

const _getAllClass = async (req, res, next) => {
    const classes = await getAllClasses();
    const metadata = {
        classes: classes
    }

    return new OK({metadata}).send(res);
}

const _getOneClassById = async (req, res, next) => {
    const {classId } = req.params;
    const classData = await getOneSubjectById(classId);
    const metadata = {
        class: classData
    }

    return new OK({metadata}).send(res);
}

const _editClass = async (req, res, next) => {
    const payload = req.body;
    const {classId } = req.params;

    const result = await editClass(payload, classId);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}

const _createClass = async (req, res, next) => {
    const payload = req.body;
    const result = await createClass(payload);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}


const _deleteClassById = async (req, res, next) => {
    const {classId } = req.params;
    const result = await deleteClassById(classId);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}

module.exports.classControllerAdmin = {
    _createClass, _deleteClassById, _editClass, _getAllClass, _getOneClassById
}