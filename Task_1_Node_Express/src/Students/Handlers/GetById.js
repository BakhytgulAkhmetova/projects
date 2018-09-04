const Student = require('../DataBase/Model');

const getById = (req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            res.status(200).json({
                message: 'GET student by id completed succesfully',
                student
            });
        })
        .catch(() => {
            res.status(500).json({
                message: `Not found student with ID :${req.params.id}`
            });
        });
};

module.exports = getById;
