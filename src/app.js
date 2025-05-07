'use strict'

require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { Database } = require('./configs/database.config.js'); 

const app = express();

app.use(cors());


// middleware
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));


// init db
Database.getInstance()

// init routes
app.use('/', require('./routers/client/index.router.js'));
app.use('/admin', require('./routers/admin/index.router.js'));


// handle errors
app.use((req, res, next) => {
    // Nếu không tìm được router thì chạy xuống đây => gán 404
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode, 
        message: error.message || 'Internal Server Error',
        stack: error.stack,
    })
})


module.exports = app;
