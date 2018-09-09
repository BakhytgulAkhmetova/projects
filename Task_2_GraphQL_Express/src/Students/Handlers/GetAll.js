const Student = require('../../MongoDB/Model');

const getAll = () => {
    const students = Student.find();

    return students;
    // if(){

    // }
    // students !== null ?
    //     res = {
    //         message: 'Operation get students completed succesfully',
    //         students
    //     }
};

module.exports = getAll;
