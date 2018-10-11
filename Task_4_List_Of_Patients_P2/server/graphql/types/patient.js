/* creation graphql types*/

const queryPatient = `
    type Query {
        getPatientsPage (
            skip: Int!,
            limit: Int!
        ): Page!
        getPatientById(
            id: String!
            ): Patient!
    }`;

const mutationPatient = `
    type Mutation {
        addPatient(
            firstName: String!,
            lastName: String!,
            birthDate: String!,
            gender: String!,
            phoneNumber: String! ,
            email: String!
        ): Patient
        updatePatient(
            firstName: String!,
            lastName: String!,
            birthDate: String!,
            gender: String!,
            phoneNumber: String! ,
            email: String!,
            id: String!
        ): Patient
        deleteAllPatients: Int!
    }
    `;

module.exports = {
    queryPatient,
    mutationPatient
};
