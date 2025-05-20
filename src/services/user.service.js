'use strict'

const { userModel } = require("../models/user.model");
const { hashEmailToHex } = require("../helpers/hash.helper");

// create new user 
const createNewUser = async (data) => {
    const newUser = await userModel.create(data);
    return newUser.get({ plain: true }); // Lấy dữ liệu thô
};


const getUserByEmail = async ( email ) => {
    return await userModel.findOne({
        where: {
            email,
            status: 'active'
        },
        raw: true
    });
}

const updateUserByEmail = async ( email, payload ) => {
    return await userModel.update(payload, {
        where: { 
            email: email, status: 'active'
        },
        raw: true
    });
}

module.exports = {
    createNewUser, getUserByEmail, updateUserByEmail
}