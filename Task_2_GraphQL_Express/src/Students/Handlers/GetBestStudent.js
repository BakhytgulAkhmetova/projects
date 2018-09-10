const Student = require('../../MongoDB/Model');
const getBestStudent = require('../Utils/getBestStudent');


const bestStudent = () => {
    return Student.find()
        .then((students) => {
            const best = getBestStudent(students);

            if ((best !== null) && (best !== undefined)) {
                return best;
            }
            return 'There is not student with high mark';
        });
};

module.exports = bestStudent;
