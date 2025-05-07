const { OK } = require("../../core/success.response");
const { getAllChapter, editChapter, createChapter, getOneChapterById } = require("../../services/chapter.service");

const _getAllChapter = async (req, res, next) => {
    const {courseId } = req.params;
    const chapters = await getAllChapter(courseId);
    const metadata = {
        chapters
    }

    return new OK({metadata}).send(res);
}

const _getOneChapterById = async (req, res, next) => {
    const {chapterId } = req.params;
    const chapter = await getOneChapterById(chapterId);
    const metadata = {
        chapter
    }

    return new OK({metadata}).send(res);
}

const _editChapter = async (req, res, next) => {
    const payload = req.body;
    const {chapterId } = req.params;

    const result = await editChapter(payload, chapterId);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}

const _createChapter = async (req, res, next) => {
    const payload = req.body;
    const result = await createChapter(payload);
    const metadata = {
        result
    }

    return new OK({metadata}).send(res);
}



module.exports.chapterControllerAdmin = {
    _createChapter, _editChapter, _getAllChapter, _getOneChapterById,
}