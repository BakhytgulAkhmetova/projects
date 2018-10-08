/* creation graphql types*/

const query = `
    type Query {
        getPatientsPage (
            skip: Int!,
            limit: Int!
        ): Page!
        getPatientById(
            id: String!
            ): Patient!
    }`;

const mutation = `
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

const customTypes = `
    scalar Date

    type Patient {
        id: String!,
        firstName: String!,
        lastName: String!,
        birthDate: Date!,
        gender: String!,
        phoneNumber: String!,
        email: String!,
        age: Int
    }

    type Page {
        items: [Patient],
        total: Int!
    }`;

module.exports = {
    query,
    mutation,
    customTypes
};
