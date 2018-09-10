const Student = require('../../MongoDB/Model');

const remove = (args) => {
    return Student.findByIdAndRemove({ _id: args.id })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
};

module.exports = remove;
