const mongoose = require('mongoose');

const Student = require('../src/MongoDB/Model');
const getAverageValue = require('../src/Utils/getAverageValue');

/* asynchronous function to add new student in storage */
async function addStudent({ name, marks }) {
    const student = new Student({
        name: name || 'Ivan',
        _id: new mongoose.Types.ObjectId(),
        marks: marks || []
    });

    try {
        return await student.save();
    } catch (error) {
        return error;
    }
}


/* asynchronous function to delete student from storage by id */
async function removeStudent({ id }) {
    try {
        return await Student.findByIdAndRemove({ _id: id });
    } catch (error) {
        return error;
    }
}

/* asynchronous function to delete all students from storage */
async function removeAllStudents() {
    try {
        await Student.deleteMany();
        return 0;
    } catch (error) {
        return error;
    }
}

/* asynchronous function to get all students from storage*/
async function getAllStudents() {
    try {
        return await Student.find();
    } catch (error) {
        return error;
    }
}

/* asynchronous function to get list of best students from storage */
async function getBestStudent() {
    try {
        const students = await Student.find();

        const arrayAverageMarkValues = students.map((student) => {
            return {
                idStudent: student.id,
                averageMark: getAverageValue(student.marks)
            };
        });

        const averageValuesCount = arrayAverageMarkValues.length;

        let bestStudentInfo = arrayAverageMarkValues[0];

        for (let i = 1; i < averageValuesCount; i++) {
            if (arrayAverageMarkValues[i].averageMark > bestStudentInfo.averageMark) {
                bestStudentInfo = arrayAverageMarkValues[i];
            }
        }
        return students.filter(student => {
            return getAverageValue(student.marks) === bestStudentInfo.averageMark;
        });
    } catch (error) {
        return error;
    }
}

/* asynchronous function to get one student from storage by id */
async function getStudentById(id) {
    try {
        return await Student.findById(id);
    } catch (error) {
        return error;
    }
}

/* asynchronous function to update info about student in storage by id */
async function updateStudent({ name, marks, id }) {
    const student = new Student({
        name,
        marks
    });

    try {
        return Student.findByIdAndUpdate(id, student, { new: true });
    } catch (error) {
        return error;
    }
}

module.exports = {
    addStudent,
    removeStudent,
    removeAllStudents,
    getAllStudents,
    getStudentById,
    getBestStudent,
    updateStudent
};
