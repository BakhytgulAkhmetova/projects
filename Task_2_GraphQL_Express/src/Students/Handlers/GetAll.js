const Student = require('../../MongoDB/Model');

const getAll = () => {
    return Student.find()
        .then((docs) => {
            return docs;
        })
        .catch((err) => {
            return err;
        });
};

module.exports = getAll;
