'use strict'

const { BadRequestError, NotFoundError } = require("../../core/error.response");
const { OK, SuccessResponse } = require("../../core/success.response");
const { getOneCourseByCourseKey } = require("../../services/course.service");
const { createEnrollment, getEnrollmentByUserEmail, getAllCourseBoughtByUserEmail } = require("../../services/enrollment.service");
const statusCodes = require("../../utils/statusCodes");

const _createEnrollment = async ( req, res, next ) => {
    const { key } = req.body;
    console.log(key)
    if(!key) {
        throw new BadRequestError('Error::: key is required')
    }

    const courseWithKey = await getOneCourseByCourseKey(key);
    if(!courseWithKey.length) {
        throw new BadRequestError('Error::: course key is not valid')
    }

    const { courseId, keyCode } = courseWithKey[0];
    if(!courseId ||!keyCode) {
        throw new BadRequestError('Error::: invalid key')
    }

    const { email } = req.user;
    if(!email) {
        throw new BadRequestError('Error::: email is required')
    }

    const existRollWithEmail = await getEnrollmentByUserEmail(email, courseId);
    if(existRollWithEmail) throw new BadRequestError('Error::: you have already enrolled this course')

    const data = {
        course_id: courseId,
        user_email: email,
        course_key: keyCode
    }
    await createEnrollment(data);

    const metadata = { courseId };
    return new OK({
        metadata
    }).send(res)

}

const _isAccess = (req, res) => {
    return new OK({}).send(res)
}

const _getAllCourseBoughtByUserEmail = async (req, res, next) => {
    const {email} = req.user;
    const courses = await getAllCourseBoughtByUserEmail(email);
    if(courses.length === 0) {
        return new SuccessResponse({status : statusCodes.NO_CONTENT}).send(res);
    }
    const metadata = {
        courses
    };
    return new OK({metadata}).send(res);
}

module.exports = {
    _createEnrollment, _isAccess, _getAllCourseBoughtByUserEmail
}