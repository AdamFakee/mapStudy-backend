'use strict'

const { BadRequestError } = require("../../core/error.response");
const { OK } = require("../../core/success.response");
const { getOneCourseByCourseKey } = require("../../services/course.service");
const { createEnrollment } = require("../../services/enrollment.service");

const _createEnrollment = async ( req, res, next ) => {
    const { key } = req.body;
    if(!key) {
        throw new BadRequestError('Error::: key is required')
    }

    const courseWithKey = await getOneCourseByCourseKey(key);
    const { courseId, keyCode } = courseWithKey[0];
    if(!courseId ||!keyCode) {
        throw new BadRequestError('Error::: invalid key')
    }

    const { email } = req.user;
    if(!email) {
        throw new BadRequestError('Error::: email is required')
    }

    const data = {
        course_id: courseId,
        user_email: email,
        course_key: keyCode
    }
    await createEnrollment(data);

    return new OK({}).send(res)

}

const _isAccess = (req, res) => {
    return new OK({}).send(res)
}

module.exports = {
    _createEnrollment, _isAccess
}