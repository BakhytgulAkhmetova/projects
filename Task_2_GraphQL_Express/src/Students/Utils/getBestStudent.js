const getAverageMark = require('../Utils/getAverageMark');

const getObjMaxAverageMark = (students) => {
    const studentsCount = students.length;
    const arrayAverageMarkValues = [];

    for (let i = 0; i < studentsCount; i++) {
        const averageMark = getAverageMark(students[i].marks);

        if (!isNaN(averageMark)) {
            arrayAverageMarkValues.push({
                idStudent: students[i].id,
                averageMark
            });
        }
    }

    const averageValuesCount = arrayAverageMarkValues.length;
    let result;

    if (averageValuesCount) {
        let bestStudentInfo = arrayAverageMarkValues[0];

        for (let i = 1; i < averageValuesCount; i++) {
            if (arrayAverageMarkValues[i].averageMark > bestStudentInfo.averageMark) {
                bestStudentInfo = arrayAverageMarkValues[i];
            }
        }
        result = students.find(student => {
            return student.id === bestStudentInfo.idStudent;
        });
    }

    return result;
};

module.exports = getObjMaxAverageMark;
