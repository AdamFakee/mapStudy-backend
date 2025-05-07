const { OK } = require("../../core/success.response");
const { createLesson, editLesson, getLessonById, getAllLessonByChapterId } = require("../../services/lesson.service");

const _getAllLesson = async (req, res, next) => {
    const {chapterId } = req.params;
    const lessons = await getAllLessonByChapterId(chapterId);
    const metadata = {
        lessons
    }

    return new OK({metadata}).send(res);
}

const _getOneLessonById = async (req, res, next) => {
    const {lessonId } = req.params;
    const lesson = await getLessonById(lessonId);
    const metadata = {
        lesson
    }

    return new OK({metadata}).send(res);
}

const _editLesson = async (req, res, next) => {
    const payload = req.body;
    const {lessonId } = req.params;

    const result = await editLesson(payload, lessonId);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}

const _createLesson = async (req, res, next) => {
    const payload = req.body;
    const result = await createLesson(payload);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}



module.exports.lessonControllerAdmin = {
    _createLesson, _editLesson, _getAllLesson, _getOneLessonById,
}