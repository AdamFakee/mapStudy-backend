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
    const queryDetail_chapter = `
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
    const queryDetail_course = `
        select name as courseName, thumbnail as courseThumbnail, id as courseId 
        from courses
        where id = ${courseId} and status = 'active'
    `
    const [ detail_chapter, detail_course ] = await Promise.all(
        [ rawQueryFrameHelper(queryDetail_chapter), rawQueryFrameHelper(queryDetail_course) ]
    )
    return { detail_chapter, detail_course };
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

const getAllCourseByCategoryId = async ( categoryId, opts ) => {
    const { limit = 16 } = opts;
    const query = `
        select courses.id as courseId, courses.thumbnail as courseThumbnail, courses.name as courseName, teachers.name as teacherName
        from categories
        join courses on categories.id = courses.category_id
        join teachers on courses.teacher_id = teachers.id
        where categories.id = ${Number(categoryId)}
        limit ${Number(limit)};
    `
    return await rawQueryFrameHelper(query);
}

const getAllCourseBySearch = async (opts) => {
    let { search = '', filters = '', _class = '', page = 1, limit = 16 } = opts;
    const offset = (page - 1) * limit;
    let condition = '';
    
    if (search.length > 0) {
        condition += `courses.name LIKE '%${search}%'`;
    }
    if (filters.length > 0) {
        condition += condition.length > 0 ? 
            ` AND courses.subject_id in (${filters})` : 
            `courses.subject_id in (${filters})`;
    }
    if (_class.length > 0 && _class !== 'all') {
        condition += condition.length > 0 ? 
            ` AND courses.class_id = ${Number(_class)}` : 
            `courses.class_id = ${Number(_class)}`;
    }

    //  tính total pagepage
    const countQuery = `
        SELECT COUNT(*) as total
        FROM courses
        JOIN teachers ON courses.teacher_id = teachers.id
        ${condition ? 'WHERE ' + condition : ''}
    `;

    // lấy data
    const dataQuery = `
        SELECT
            courses.id as courseId,
            courses.thumbnail as courseThumbnail,
            courses.name as courseName,
            teachers.name as teacherName
        FROM courses
        JOIN teachers ON courses.teacher_id = teachers.id
        ${condition ? 'WHERE ' + condition : ''}
        LIMIT ${limit} OFFSET ${offset}
    `;

    // Thực hiện cả 2 query
    const [totalResult, courses] = await Promise.all([
        rawQueryFrameHelper(countQuery),
        rawQueryFrameHelper(dataQuery)
    ]);

    const total = totalResult[0].total; // tổng số bản ghi 
    const totalPages = Math.ceil(total / limit);

    return {
        courses,
        pagination: {
            totalPages,
            currentPage: page,
        }
    };
};


const getOneCourseByCourseKey = async (courseKey) => {
    const query = `
        select Courses.id as courseId, CourseKeys.key_code as keyCode  from CourseKeys
        join Courses on Courses.id = CourseKeys.course_id
        where CourseKeys.key_code = '${courseKey}' and CourseKeys.status = 'active' and Courses.status = 'active'
    `
    return await rawQueryFrameHelper(query);
}

module.exports = {
    getAllCourses, getCoursesByOptions, getDetailCourse_contain_detailChapter, getAllCoursesByTeacherId, getAllCourseByCategoryId, getAllCourseBySearch, getOneCourseByCourseKey
}