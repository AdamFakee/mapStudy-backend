'use strict';

const { NotFoundError } = require("../../core/error.response");
const { NoContent, OK } = require("../../core/success.response");
const { getDetailCourse_contain_detailChapter, getCoursesByOptions, getAllCoursesByTeacherId, getAllCourseByCategoryId, getAllCourseBySearch } = require("../../services/course.service");

const _getDetailCourse_contain_detailChapter = async ( req, res, next ) => {
    const courseId = req.params.courseId;

    const { detail_chapter, detail_course } = await getDetailCourse_contain_detailChapter( courseId );

    // k tìm được khóa học tức là route này gặp lỗi 404 
    if( detail_chapter.length === 0 || detail_course.length === 0 ) {
        return new NotFoundError().send(res);
    }

    const metadata = { detail_chapter, detail_course: detail_course[0] };
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

const _getAllCourseByCategoryId = async ( req, res, next ) => {
    const categoryId = req.params.categoryId;
    console.log(categoryId)
    const coursesByCategoryId = await getAllCourseByCategoryId(categoryId, req.query);
    if( coursesByCategoryId.length === 0 ) {
        return new NoContent({}).send(res);
    }

    const metadata = { courses: coursesByCategoryId };
    return new OK({ metadata }).send(res);
}

const _getAllCourseBySearch = async ( req, res, next ) => {
    const { courses, pagination } = await getAllCourseBySearch(req.query);
    if( courses.length === 0 ) {
        return new NoContent({}).send(res);
    }
    const metadata = { courses, pagination };
    return new OK({ metadata }).send(res);
}
module.exports = {
    _getDetailCourse_contain_detailChapter, _getCoursesByOptions, _getAllCoursesByTeacherId, _getAllCourseByCategoryId, _getAllCourseBySearch
}
