import gql from 'graphql-tag';

export const getPage = gql`
           query ($skip: Int! 
                  $limit: Int!){
                    getPage (skip: $skip, limit: $limit) {
                        items{
                            firstName
                                lastName
                                id
                                birthDate
                                phoneNumber
                                email
                                gender
                          }
                          total
                        }
                    }`;
