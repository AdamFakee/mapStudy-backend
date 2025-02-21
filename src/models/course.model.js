const { sequelize } = require('../configs/database.config');
const { DataTypes } = require('sequelize');

const courseSchema = sequelize.define(
  'Course',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isHot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    video_link: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING(500),
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Courses',
    timestamps: false, // No timestamps by default
  }
);

courseSchema.associate = (models) => {
  // Defining relationships
  courseSchema.belongsTo(models.Teacher, {
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  courseSchema.belongsTo(models.Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  courseSchema.belongsTo(models.Class, {
    foreignKey: 'class_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  courseSchema.belongsTo(models.Subject, {
    foreignKey: 'subject_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

module.exports.courseModel = courseSchema;
