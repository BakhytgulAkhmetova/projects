const Student = require('../DataBase/Model');

const update = (req, res) => {
    const student = new Student({
        name: req.body.name,
        marks: req.body.marks
    });

    Student.findByIdAndUpdate(req.params.id, student)
        .then(result => {
            res.status(200).json({
                message: `Updated student with ID ${result.id} succesfully`
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'Oparation updating completed unsuccesfully'
            });
        });
};

module.exports = update;
