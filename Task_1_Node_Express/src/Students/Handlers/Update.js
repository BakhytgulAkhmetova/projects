const Student = require('../DataBase/Model');

const update = (req, res) => {
    const student = new Student({
        name: req.body.name,
        marks: req.body.marks
    });

    Student.findByIdAndUpdate(req.params.id, student)
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'updated succesfully',
                result
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'Error in updating'
            });
        });
};

module.exports = update;
