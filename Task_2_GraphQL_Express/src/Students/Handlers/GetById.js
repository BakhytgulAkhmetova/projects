const Student = require('../../MongoDB/Model');

const getById = (id) => {
    return Student.findById(id)
        .then(student => {
            return student;
        })
        .catch((error) => {
            return error;
        });
};

module.exports = getById;
