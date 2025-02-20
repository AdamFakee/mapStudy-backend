const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.config');

const userSchema = sequelize.define('user', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.STRING(500),
        allowNull: true, 
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active', 
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
},  { 
    tableName : 'users',
    timestamps: false,
})

userSchema.removeAttribute('id')

module.exports.userModel = userSchema;