/* import own modules to handle queries and mutations */
const { getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    removeStudent,
    removeAllStudents,
    getBestStudent } = require('../DAL');

/* creation graphQL resolve functions */
const resolvers = {
    Query: {
        getStudentById(parent, args) {
            return getStudentById(args.id);
        },
        getStudents() {
            return getAllStudents();
        },
        getBestStudent() {
            return getBestStudent();
        }
    },
    Mutation: {
        addStudent(parent, args) {
            return addStudent(args);
        },
        updateStudent(parent, args) {
            return updateStudent(args);
        },
        deleteAllStudents() {
            return removeAllStudents();
        },
        deleteStudent(parent, args) {
            return removeStudent(args);
        }
    }
};

module.exports = resolvers;
