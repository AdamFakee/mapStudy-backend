const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database.config");

const chapterSchema = sequelize.define("Chapter", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Course',
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "Chapters",
    timestamps: false, 
});


module.exports.chapterModel = chapterSchema;
