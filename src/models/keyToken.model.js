const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.config');

const keyTokenSchema = sequelize.define('Keytoken', {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, 
    },
    publicKey: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    privateKey: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    refreshTokenUsed: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName : 'Keytokens',
    timestamps: false,
});

keyTokenSchema.removeAttribute('id')

module.exports.keyTokenModel = keyTokenSchema;
