const { chapterModel } = require("../models/chapter.model");
const { redisService } = require("./redis.service");

const getChapterById = async (chapterId) => {
    // get from redis
    const redisKey = `chapter:${chapterId}`;
    const cachedData = await redisService.get(redisKey);
    if (cachedData) {
        return cachedData;
    }
    const chapter = await chapterModel.findByPk(chapterId);

    redisService.setString(redisKey, chapter);
    return chapter;
}

module.exports = {
    getChapterById
}