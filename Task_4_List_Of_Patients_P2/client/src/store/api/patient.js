import gql from 'graphql-tag';

export const addPatient = gql`
         mutation($firstName: String!, $lastName: String!, $birthDate: String!,
             $phoneNumber: String!, $email: String!, $gender: String!) {
           addPatient(firstName: $firstName, lastName: $lastName, birthDate: $birthDate, 
            phoneNumber: $phoneNumber, email: $email, gender: $gender) {
             firstName
             lastName
             birthDate
             phoneNumber
             email
             gender }
         }`;

export const getPatientsPage = gql`
         query($skip: Int!, $limit: Int!) {
           getPatientsPage(skip: $skip, limit: $limit) {
             items {
               firstName
               lastName
               _id
               birthDate
               phoneNumber
               email
               gender
               age }
             total
           }
         }`;

export const getPatientById = gql`
         query($id: String!) {
           getPatientById(id: $id) {
             firstName
             lastName
             _id
             birthDate
             phoneNumber
             email
             gender }
         }`;

export const editPatient = gql`
         mutation($firstName: String!, $id: String!, $lastName: String!, $birthDate: String!,
             $phoneNumber: String!, $email: String!, $gender: String!) {
           updatePatient(firstName: $firstName, lastName: $lastName, id: $id, birthDate: $birthDate,
             phoneNumber: $phoneNumber, email: $email, gender: $gender) {
             firstName
             lastName
             birthDate
             phoneNumber
             email
             gender
           }
         }`;
