import gql from 'graphql-tag';

export const edit = gql` mutation (
            $firstName: String! 
            $id: String!
            $lastName: String!
            $birthDate: String!
            $phoneNumber: String! 
            $email: String!
            $gender: String!){
                updatePatient (
                    firstName: $firstName 
                    lastName: $lastName
                    id: $id
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
