const { sequelize } = require('../configs/database.config');
const { DataTypes } = require('sequelize');

const courseKeySchema = sequelize.define(
  'CourseKey',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    key_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'used'),
      defaultValue: 'active',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'CourseKeys',
    timestamps: false, // No timestamps by default
  }
);

// Associations
courseKeySchema.associate = (models) => {
    courseKeySchema.belongsTo(models.Course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

module.exports.courseKeyModel = courseKeySchema;
