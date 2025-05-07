const { chapterModel } = require("../models/chapter.model")


const getOneChapterById = async (id) => {
    return await chapterModel.findOne({
        where: {
            id: id,
        },
        raw: true
    })
}

const getAllChapter = async (courseId) => {
    return await chapterModel.findAll({
        where: {
            course_id: courseId
        },
        raw: true
    })
}

const editChapter = async (payload, chapter) => {
    return await chapterModel.update(payload, {
        where: { 
            id: chapter,
        },
        raw: true
    });
}

const createChapter = async ( payload ) => {
    return await chapterModel.create(payload);
}




module.exports = {
    getAllChapter, getOneChapterById, editChapter, createChapter,
}