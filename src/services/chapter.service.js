const { chapterModel } = require("../models/chapter.model")

const getChapterById = async (chapterId) => {
    return await chapterModel.findByPk(chapterId);
}

module.exports = {
    getChapterById
}