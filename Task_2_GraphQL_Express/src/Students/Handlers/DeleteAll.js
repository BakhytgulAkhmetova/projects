const Student = require('../../MongoDB/Model');

const remove = () => {
    Student.deleteMany();

    return 'All students deleted';
};

module.exports = remove;
