const { NotFoundError } = require("../../core/error.response");
const { OK } = require("../../core/success.response");
const { getOneCategoryById, getAllCategories } = require("../../services/category.service");
const { getOneClassById, getAllClasses } = require("../../services/class.service");
const { getAllCoursesByTeacherId, editCourse, getOneCourseById, createCourse, deleteCourseById } = require("../../services/course.service");
const { getOneSubjectById, getAllSubject } = require("../../services/subject.service");

const _getAllCourseByTeacherId = async (req, res, next ) => {
    const { teacherId } = req.user;
    const courses = await getAllCoursesByTeacherId(teacherId);
    const metadata = { courses };
    return new OK({ metadata }).send(res);
}

const _getOneCourseById = async (req, res, next ) => {
    const { courseId } = req.params;
    const course = await getOneCourseById(courseId);

    if(!course) {
        return new NotFoundError().send(res);
    }

    const [category, classData, subject] = await Promise.all([
        getAllCategories({limit: 100}),
        getAllClasses(),
        getAllSubject(),
    ]);

    const metadata = {
        course,
        category, class: classData, subject
    }
    return new OK({metadata}).send(res);
}

const _getRelationalForCourse = async ( req, res, next ) => {
    const [category, classData, subject] = await Promise.all([
        getAllCategories({limit: 100}),
        getAllClasses(),
        getAllSubject(),
    ]);

    const metadata = {
        category, class: classData, subject
    }
    return new OK({metadata}).send(res);
}

const _editCourse = async ( req, res, next ) => {
    const payload = req.body;
    const {teacherId} = req.user;
    const { courseId } = req.params;

    const result = await editCourse(payload, teacherId, courseId);
    return new OK({
        metadata: {
            result
        }
    }).send(res)
    
}

const _createCourse = async (req, res, next) => {
    const {teacherId} = req.user;
    const payload = {...req.body, teacher_id: teacherId};
    const result = await createCourse(payload);
    return new OK({
        metadata: {
            result
        }
    }).send(res)

}

const _deleteCourseById = async (req, res, next ) => {
    const { teacherId } = req.user;
    const { courseId } = req.params;
    const result = await deleteCourseById(courseId, teacherId);
    return new OK({
        metadata: {
            result
        }
    }).send(res)
}
module.exports.courseControllerAdmin = {
    _getAllCourseByTeacherId, _editCourse, _getOneCourseById, _getRelationalForCourse, _createCourse, _deleteCourseById
}