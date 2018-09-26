import gql from 'graphql-tag';

export const getById = gql
    `query ($id: String!){
            getPatientById (id: $id) {
                            firstName
                            lastName
                            id
                            birthDate
                            phoneNumber
                            email
                            gender
                        }
                    }`;
