const queryTypeDoctor = `
    type Query {
        getAllDoctors: [Doctor]
        getDoctorById(
            id: String!
            ): Doctor!
    }`;

const mutationTypeDoctor = `
    type Mutation {
        addDoctor(
            firstName: String!,
            lastName: String!
        ): Doctor
        deleteAllDoctors: Int
    }
    `;

module.exports = {
    queryTypeDoctor,
    mutationTypeDoctor
};
