const update = (id, data, arrayStudents ) => {
    return arrayStudents.map(student => {
        if (student.id === id) {
          return {
              ...student,
              name: data.name,
              marks: JSON.parse(data.marks)
          }
          return student
      }
  })
}

module.exports = update;