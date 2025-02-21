'use strict';

const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");
const { courseModel } = require("../models/course.model");

// luôn trả về khóa học mới nhất nếu k có truyền opts
const getCoursesByOptions = async ( opts ) => {
    const { isNew = false, isHot = true, limit = 10 } = opts;
    const query = `
        select teachers.id as teacherId, teachers.name as teacherName, teachers.thumbnail as teacherThubnail, courses.thumbnail as courseThumbnail, courses.name as courseName, courses.id as courseId  
        from courses
        join teachers on courses.teacher_id = teachers.id
        where isHot = ${isHot} and isNew = ${isNew}
        limit ${limit}
    `
    return await rawQueryFrameHelper(query);
}

const getAllCourses = async ( ) => {
    return await courseModel.findAll({
        where: {
            status: 'active',
        },
        raw: true,
    })
}

const getDetailCourse_contain_detailChapter = async ( courseId ) => {
    const query = `
        SELECT 
            chapters.title,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "lessonId", lessons.id,
                    "lessonTitle", lessons.title
                )
            ) AS lessons
        FROM chapters
        JOIN lessons ON lessons.chapter_id = chapters.id
        WHERE chapters.course_id = ${courseId}
        GROUP BY chapters.id;
    `

    return await rawQueryFrameHelper(query);
}

const getAllCoursesByTeacherId = async ( teacherId ) => {
    return await courseModel.findAll({
        where: {
            status: 'active',
            teacher_id: teacherId,
        },
        raw: true,
    })
}

module.exports = {
    getAllCourses, getCoursesByOptions, getDetailCourse_contain_detailChapter, getAllCoursesByTeacherId
}