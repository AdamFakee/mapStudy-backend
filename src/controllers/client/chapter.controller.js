const { NotFoundError, BadRequestError } = require("../../core/error.response");
const { OK } = require("../../core/success.response");
const { getChapterById } = require("../../services/chapter.service");

const _getChapterById = async ( req, res, next ) => {
    const { chapterId } = req.params;
    if(!chapterId) throw new BadRequestError('invalid chapterid')
    const chapter = await getChapterById(chapterId);
    if(!chapter) throw new NotFoundError();
    
    const metadata = { chapter };
    return new OK({ metadata }).send(res);
}

module.exports = {
    _getChapterById,
};