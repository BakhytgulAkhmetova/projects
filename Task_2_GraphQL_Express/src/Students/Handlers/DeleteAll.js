const Student = require('../../MongoDB/Model');

const remove = () => {
    return Student.deleteMany({});
    // .then(() => {
    //     res.status(200).json({
    //         message: 'Deleted all successfully '
    //     });
    // })
    // .catch(() => {
    //     res.status(500).json({
    //         message: 'Operation deleted completed unsuccessfully'
    //     });
    // });
};

module.exports = remove;
