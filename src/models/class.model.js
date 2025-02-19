const { sequelize } = require('../configs/database.config');
const { DataTypes } = require('sequelize');

const classSchema = sequelize.define(
  'Class',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    tableName: 'Classes',
    timestamps: false, 
  }
);

module.exports.classModel = classSchema;
