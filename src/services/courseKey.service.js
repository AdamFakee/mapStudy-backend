const { courseKeyModel } = require("../models/courseKey.model")

const getCourseKeyByKey = async (courseKey) => {
    return await courseKeyModel.findOne({
        where: {
            key_code: courseKey,
            status: 'active'
        },
        raw: true,
    })
}

module.exports = {
    getCourseKeyByKey
}