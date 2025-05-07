const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");
const { enrollmentModel } = require("../models/enrollment.model")

const getEnrollmentByUserEmail = async (userEmail, courseId) => {
    return await enrollmentModel.findOne({
        where: {
            user_email: userEmail,
            course_id: courseId
        },
        raw: true,
    })
}

const createEnrollment = async ( data ) => {
    return await enrollmentModel.create(data);
}

const getAllCourseBoughtByUserEmail = async (email) => {
    const query = `
        SELECT 
            teachers.id as teacherId, teachers.name as teacherName, teachers.thumbnail as teacherThubnail, courses.thumbnail as courseThumbnail, courses.name as courseName, courses.id as courseId  
        FROM enrollments
        JOIN courses ON enrollments.course_id = courses.id
        join teachers on courses.teacher_id = teachers.id
        WHERE enrollments.user_email = '${email}';
    `
    return await rawQueryFrameHelper(query)
}

module.exports = {
    getEnrollmentByUserEmail, createEnrollment, getAllCourseBoughtByUserEmail
}