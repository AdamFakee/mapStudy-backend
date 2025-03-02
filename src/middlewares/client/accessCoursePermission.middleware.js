const { HEADER } = require("../../consts/header.const");
const { NotFoundError, ForbiddenRequestError } = require("../../core/error.response");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const { getEnrollmentByUserEmail } = require("../../services/enrollment.service");

// check xem được truy cập khóa học này hay k 
const accessCoursePermission = asyncHandler( async (req, res, next) => {
    const { email } = req.user;
    const coursedId = req.headers[HEADER.COURSE_ID];
    if( !email || !coursedId ) {
        throw new NotFoundError('Error::: missing email or coursesId is not exists')
    }

    const isAccess = await getEnrollmentByUserEmail(email, coursedId);

    if(!isAccess) {
        throw new ForbiddenRequestError('Error::: can not access in this course')
    }
    return next();
})

module.exports = accessCoursePermission;