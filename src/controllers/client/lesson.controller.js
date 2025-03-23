const { NotFoundError, BadRequestError } = require("../../core/error.response");
const { OK } = require("../../core/success.response");
const { getLessonById } = require("../../services/lesson.service");

const _getLessonById = async ( req, res, next ) => {
    const { lessonId } = req.params;
    if(!lessonId) throw new BadRequestError('invalid chapterid')
    const chapter = await getLessonById(lessonId);
    if(!chapter) throw new NotFoundError();
    
    const metadata = { chapter };
    return new OK({ metadata }).send(res);
}

module.exports = {
    _getLessonById,
};