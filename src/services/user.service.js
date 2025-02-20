'use strict'

const { where } = require("sequelize");
const { userModel } = require("../models/user.model");
const { raw } = require("mysql2");

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


module.exports = {
    createNewUser, getUserByEmail
}