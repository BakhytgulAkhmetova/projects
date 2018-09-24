import gql from 'graphql-tag';

export const getAll = gql`
           query ($skip: Int! 
                  $limit: Int!){
                    getPatients (skip: $skip, limit: $limit) {
                            firstName
                            lastName
                            id
                            birthDate
                            phoneNumber
                            email
                            gender
                        }
                    }`;
