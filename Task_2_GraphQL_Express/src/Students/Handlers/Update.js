const Student = require('../../MongoDB/Model');

const update = (args) => {
    const student = new Student({
        name: args.name,
        marks: args.marks
    });

    return Student.findByIdAndUpdate(args.id, student, { new: true })
        .then((updated) => {
            return updated;
        })
        .catch((error) => {
            return error;
        });
};

module.exports = update;
