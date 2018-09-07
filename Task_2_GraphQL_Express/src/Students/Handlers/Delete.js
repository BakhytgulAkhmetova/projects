const Student = require('../DataBase/Model');

const remove = (req, res) => {
    Student.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(200).json({
                message: `Deleted student ${result.name} succesfully`
            });
        })
        .catch(() => {
            res.status(500).json({
                message: `Not found student with ID :${req.params.id}`
            });
        });
};

module.exports = remove;
