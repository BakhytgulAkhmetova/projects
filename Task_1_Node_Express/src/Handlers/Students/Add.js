const add = (req, id, arrayStudents ) =>{
    const student = {
        name: req.body.name,
        id,
        marks: []
    }
    arrayStudents.push(student);
}

module.exports = add;