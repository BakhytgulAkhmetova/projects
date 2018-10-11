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
    customTypes
};
