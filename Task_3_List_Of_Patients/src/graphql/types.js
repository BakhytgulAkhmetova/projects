/*creation graphql types*/

const typeDefs = `
    scalar Date

    type Patient {
        id: String!,
        firstName: String!,
        lastName: String!,
        birthDate: Date!,
        gender: String!,
        phoneNumber: String! ,
        email: String!,
        age: Int
    }

    type Page {
        items: [Patient],
        total: Int!
    }

    type Query {
        getPage (
            skip: Int!,
            limit: Int!
        ): Page!
        getPatientById(
            id: String!
        ): Patient!
    }

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
    
    schema {
        query: Query
        mutation: Mutation
    }`;

module.exports = typeDefs;
