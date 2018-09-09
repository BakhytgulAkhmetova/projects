const Student = require('../../MongoDB/Model');

const remove = (args) => {
    return Student.findByIdAndRemove(args.id);
    // .then(result => {
    //     .status(200).json({
    //         message: `Deleted student ${result.name} succesfully`
    //     });
    // })
    // .catch(() => {
    //     res.status(500).json({
    //         message: `Not found student with ID :${req.params.id}`
    //     });
    // });
};

module.exports = remove;
