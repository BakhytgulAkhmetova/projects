/*creation graphql types*/

const typeDefs = `
    type Patient {
        id: String!,
        firstName: String!,
        lastName: String!,
        birthDate: String!,
        gender: String!,
        phoneNumber: String! ,
        email: String!
    }

    type Query {
        getPatients (
            skip: Int!,
            limit: Int!
        ): [Patient]
        getPatientCount
        : Int!
        getPatientById(
            id: String!
        ): Patient
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
