const { sequelize } = require('../configs/database.config');
const { DataTypes } = require('sequelize');

const categorySchema = sequelize.define(
  'Category',
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
    tableName: 'Categories',
    timestamps: false, // Không cần timestamps mặc định
  }
);

module.exports.categoryModel = categorySchema;
