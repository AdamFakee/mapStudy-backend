const { sequelize } = require('../configs/database.config');
const { DataTypes } = require('sequelize');

const enrollmentSchema = sequelize.define(
  'Enrollment',
  {
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'Users', // Tên bảng users
        key: 'email',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses', // Tên bảng courses
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    course_key: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    tableName: 'enrollments',
    timestamps: false, // Không có createdAt và updatedAt
  }
);

enrollmentSchema.removeAttribute('id');

module.exports.enrollmentModel = enrollmentSchema;
