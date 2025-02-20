// 'use strict'

const { where } = require("sequelize");
const { keyTokenModel } = require("../models/keyToken.model")

// get one field by userId, teacherId
const getOneKeyTokenByEmail = async ( email ) => {
    return await keyTokenModel.findOne({
        where: {
            email: email
        },
        raw: true
    });
}

// create new field
const createNewKeyToken = async ( email, data ) => {
    return await keyTokenModel.create({ email, ...data });
}

// create or update current field
const createOrUpdateKeyToken = async ( email, data ) => {
    return await keyTokenModel.upsert({ email, ...data});
}

// remove keytoken
const removerKeyTokenByEmail = async ( email ) => {
    return await keyTokenModel.destroy({
        where: {
            email: email
        }
    })
}
module.exports = {
    getOneKeyTokenByEmail, createNewKeyToken, createOrUpdateKeyToken, removerKeyTokenByEmail
}