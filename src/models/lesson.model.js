const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database.config");

const lessonSchema = sequelize.define("Lesson", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Chapter',
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    video_link: {
        type: DataTypes.STRING(500),
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "Lessons",
    timestamps: false,
});


module.exports.lessonModel = lessonSchema;
