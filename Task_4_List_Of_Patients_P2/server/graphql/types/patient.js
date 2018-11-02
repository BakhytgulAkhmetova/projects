/* creation graphql types*/

const queryTypePatient = `
    type Query {
        getPatientsPage (skip: Int!, limit: Int!): PatientPage!
        getPatientById(id: String!): Patient! 
    }`;

const mutationTypePatient = `
    type Mutation {
        addPatient( firstName: String!,
            lastName: String!,
            birthDate: String!,
            gender: String!,
            phoneNumber: String! ,
            email: String!
        ): Patient
        updatePatient( firstName: String!,
            lastName: String!,
            birthDate: String!,
            gender: String!,
            phoneNumber: String! ,
            email: String!,
            id: String! ): Patient
        deleteAllPatients: Int! 
    }`;

module.exports = {
    queryTypePatient,
    mutationTypePatient
};
