import gql from 'graphql-tag';

export const getPatientsPage = gql
    `query ($skip: Int! 
                  $limit: Int!){
                    getPatientsPage (skip: $skip, limit: $limit) {
                        items{
                            firstName
                                lastName
                                id
                                birthDate
                                phoneNumber
                                email
                                gender
                                age
                          }
                          total
                        }
                    }`;
