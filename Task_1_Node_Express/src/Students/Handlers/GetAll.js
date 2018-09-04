const Student = require('../DataBase/Model');

const getAll = (req, res) => {
    Student.find()
        .then((students) => {
            res.status(200).json({
                message: 'GET students completed succesfully',
                students
            });
        })
        .catch((error) => console.log(error));
};

module.exports = getAll;
