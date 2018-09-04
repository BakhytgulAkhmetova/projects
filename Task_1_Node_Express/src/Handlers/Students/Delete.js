const remove = (id, arrayStudents ) => {
    arrayStudents.splice(arrayStudents.findIndex(
        student => student.id.toString() === id), 1);
    return arrayStudents;
}

module.exports = remove;