const Student = require('../DataBase/Model');

const getAll = (req, res) => {
    Student.find()
        .then((students) => {
            res.status(200).json({
                message: 'Operation get students completed succesfully',
                students
            });
        });
};

module.exports = getAll;
