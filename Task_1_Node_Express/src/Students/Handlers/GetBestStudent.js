const Student = require('../DataBase/Model');
const getBestStudent = require('../Utils/getBestStudent');


const bestStudent = (res) => {
    Student.find()
        .then((students) => {
            const best = getBestStudent(students);

            if ((best !== null) && (best !== undefined)) {
                res.status(200).json({
                    best
                });
            } else {
                res.status(404).json({
                    message: 'There is not student with high mark'
                });
            }
        });
};

module.exports = bestStudent;
