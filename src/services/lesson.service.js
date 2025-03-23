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

module.exports = {
    getLessonById
}