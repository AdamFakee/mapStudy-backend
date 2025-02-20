'use strict'

const { QueryTypes } = require("sequelize")
const { sequelize } = require("../configs/database.config")

// pass query string in database
const rawQueryFrameHelper = async (query) => {
    return await sequelize.query(
        query,
        {
            type : QueryTypes.SELECT
        }
    )
}

module.exports.rawQueryFrameHelper = rawQueryFrameHelper;