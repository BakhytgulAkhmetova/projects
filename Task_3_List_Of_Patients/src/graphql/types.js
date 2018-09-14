/*creation graphql types*/ 

const typeDefs = `
    scalar DateTime
    scalar Email

    type Patient {
        id: String!,
        firstName: String!,
        lastName String!,
        birthdate: DateTime!,
        age: Int
        gender: String!,
        phoneNumber: ,
        emailAddress: Email
    }

    type Query {

    }

    type Mutation {

    }`;

module.exports = typeDefs;
