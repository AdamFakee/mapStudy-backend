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

module.exports = {
    getEnrollmentByUserEmail, createEnrollment
}