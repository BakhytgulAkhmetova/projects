import gql from 'graphql-tag';

export const add = gql` mutation (
            $firstName: String! 
            $lastName: String!
            $birthDate: String!
            $phoneNumber: String! 
            $email: String!
            $gender: String!){
                addPatient (
                    firstName: $firstName 
                    lastName: $lastName
                    birthDate: $birthDate
                    phoneNumber: $phoneNumber 
                    email: $email
                    gender: $gender){
                        firstName 
                        lastName
                        birthDate
                        phoneNumber
                        email
                        gender
                    }
             }
              `;
