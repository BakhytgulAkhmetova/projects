import gql from 'graphql-tag';

export const addPatient = gql`
         mutation(
             $firstName: String!, $lastName: String!, $birthDate: String!,
             $phoneNumber: String!, $email: String!, $gender: String!) {
           addPatient(
            firstName: $firstName, lastName: $lastName, birthDate: $birthDate, 
            phoneNumber: $phoneNumber, email: $email, gender: $gender) {
             firstName
             lastName
             birthDate
             phoneNumber
             email
             gender
           }
         }
       `;


export const getSelectedPatients = gql`
         query($letters: String!) {
          getSelectedPatients(letters: $letters) {
               value
               label
           }
         }
       `;

export const getSelectedDoctors = gql`
       query($letters: String!) {
        getSelectedDoctors(letters: $letters) {
          value
          label
         }
       }
     `;

export const getSelectedDescriptions = gql`
     query($letters: String!) {
      getSelectedDescriptions(letters: $letters) {
        value
        label
       }
     }
   `;
export const getPatientById = gql`
         query($id: String!) {
           getPatientById(id: $id) {
             firstName
             lastName
             id
             birthDate
             phoneNumber
             email
             gender
           }
         }
       `;


export const editPatient = gql`
         mutation(
             $firstName: String!, $id: String!, $lastName: String!, $birthDate: String!,
             $phoneNumber: String!, $email: String!, $gender: String!) {
           updatePatient(
             firstName: $firstName, lastName: $lastName, id: $id, birthDate: $birthDate,
             phoneNumber: $phoneNumber, email: $email, gender: $gender) {
             firstName
             lastName
             birthDate
             phoneNumber
             email
             gender
           }
         }
       `;
