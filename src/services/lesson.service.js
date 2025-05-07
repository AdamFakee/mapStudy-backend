const { lessonModel } = require("../models/lesson.model");
const { redisService } = require("./redis.service");

const getLessonById = async (lessonId) => {
    // get from redis
    const redisKey = `lesson:${lessonId}`;
    const cachedData = await redisService.getString(redisKey);
    if (cachedData) {
        return cachedData;
    }
    const lesson = await lessonModel.findByPk(lessonId);
    redisService.setString(redisKey, lesson);
    return lesson;
}


const getAllLessonByChapterId = async (chapterId) => {
    return await lessonModel.findAll({
        where: {
            chapter_id: chapterId
        },
        raw: true
    })
}

const editLesson = async (payload, lessonId) => {
    return await lessonModel.update(payload, {
        where: { 
            id: lessonId,
        },
        raw: true
    });
}

const createLesson = async ( payload ) => {
    return await lessonModel.create(payload);
}

module.exports = {
    getLessonById, editLesson, getAllLessonByChapterId, createLesson
}