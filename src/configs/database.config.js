'use strict'
const Sequelize = require('sequelize');
require('dotenv').config();
 
const sequelize = new Sequelize(
    process.env.DATABASE_NAME, // tên database
    process.env.DATABASE_USER_NAME, // username
    process.env.DATABASE_PASSWORD, // password
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql'
    }
);


class Database {
    constructor () {
        this.Connect()
    }

    Connect () {
        sequelize.authenticate().then(() => {
            console.log('Kết nối db thành công!');
        }).catch((error) => {
            console.error('Kết nối db thất bại: ', error);
        });
    }

    static getInstance() {
        if(!this.Instance) {
            this.Instance = new Database();
            return this.Instance;
        }
        return this.Instance
    }
}

module.exports = { Database, sequelize };