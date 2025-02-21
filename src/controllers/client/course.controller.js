'use strict';

const { NoContent, OK } = require("../../core/success.response");
const { getDetailCourse_contain_detailChapter, getCoursesByOptions, getAllCoursesByTeacherId } = require("../../services/course.service");

const _getDetailCourse_contain_detailChapter = async ( req, res, next ) => {
    const courseId = req.params.courseId;

    const courseDetail = await getDetailCourse_contain_detailChapter( courseId );
    if( courseDetail.length === 0 ) {
        return new NoContent({}).send(res);
    }

    const metadata = { courseDetail };
    return new OK({ metadata }).send(res);
}

const _getCoursesByOptions = async ( req, res, next ) => {
    const opts  = req.query;
    const coursesByOpts = await getCoursesByOptions(opts);
    if( coursesByOpts.length === 0 ) {
        return new NoContent({}).send(res);
    }

    const metadata = { courses: coursesByOpts };
    return new OK({ metadata }).send(res);
}

const _getAllCoursesByTeacherId = async ( req, res, next ) => {
    const teacherId = req.params.teacherId;
    const coursesByTeacherId = await getAllCoursesByTeacherId(teacherId);
    console.log(coursesByTeacherId)
    if( coursesByTeacherId.length === 0 ) {
        return new NoContent({}).send(res);
    }

    const metadata = { courses: coursesByTeacherId };
    return new OK({ metadata }).send(res);
}

module.exports = {
    _getDetailCourse_contain_detailChapter, _getCoursesByOptions, _getAllCoursesByTeacherId
}
