const { sequelize } = require('../configs/database.config');
const { DataTypes } = require('sequelize');

const subjectSchema = sequelize.define(
  'Subject',
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
    tableName: 'Subjects',
    timestamps: false, // No timestamps by default
  }
);

module.exports.subjectModel = subjectSchema;
