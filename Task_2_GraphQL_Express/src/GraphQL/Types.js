/* creation graphQL types */
const typeDefs = `
    type Student {
      id: String!
      name: String
      marks: [Int]
    }
    
    type Query {
        getStudentById(
            id: String!
        ): Student
        getStudents: [Student]
        getBestStudent: [Student]
    }
    
    type Mutation {
        addStudent(
            name: String
            marks: [Int]
        ): Student
        updateStudent(
            id: String!
            name: String
            marks: [Int]
        ): Student
        deleteAllStudents: Int
        deleteStudent(
            id: String!
        ): Student
    }

    schema {
      query: Query
      mutation: Mutation
    }
    `;

module.exports = typeDefs;
