const Student = require('../../MongoDB/Model');

const getById = (id) => {
    return Student.findById(id);
    // .then(student => {
    //     res.status(200).json({
    //         message: `Student with ID ${student.id} found succesfully`,
    //         student
    //     });
    // })
    // .catch(() => {
    //     res.status(500).json({
    //         message: `Not found student with ID :${req.params.id}`
    //     });
    // });
};

module.exports = getById;
