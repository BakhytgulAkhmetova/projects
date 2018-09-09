const Student = require('../../MongoDB/Model');

const update = (args) => {
    const student = new Student({
        name: args.name,
        marks: args.marks
    });

    return Student.findByIdAndUpdate(args.id, student);
    // .then(result => {
    //     res.status(200).json({
    //         message: `Updated student with ID ${result.id} succesfully`
    //     });
    // })
    // .catch(() => {
    //     res.status(500).json({
    //         message: 'Oparation updating completed unsuccesfully'
    //     });
    // });
};

module.exports = update;
