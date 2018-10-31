import gql from 'graphql-tag';

export const addVisit = gql`
         mutation(
           $patientId: String!, $doctorId: String!, $descriptionId: String!, $date: Date!) {
           addVisit(patientId: $patientId, doctorId: $doctorId, descriptionId: $descriptionId, date: $date) {
              patientId
              doctorId
              descriptionId
              date
           }
         }
       `;

export const getVisitsPage = gql`
         query($skip: Int!, $limit: Int!) {
          getVisitsPage(skip: $skip, limit: $limit) {
            items{
              patient
              doctor
              description
              date
              id
            }
            total
           }
         }
       `;

export const getSelectedPatients = gql`
         query($letters: String!, $skip: Int!, $limit: Int!) {
          getSelectedPatients(letters: $letters, skip: $skip, limit: $limit) {
               value
               label
           }
         }
       `;

export const getSelectedDoctors = gql`
       query($letters: String!, $skip: Int!, $limit: Int!) {
        getSelectedDoctors(letters: $letters, skip: $skip, limit: $limit) {
          value
          label
         }
       }
     `;

export const getSelectedDescriptions = gql`
     query($letters: String!, $skip: Int!, $limit: Int!) {
      getSelectedDescriptions(letters: $letters, skip: $skip, limit: $limit) {
        value
        label
       }
     }
   `;
export const getVisitById = gql`
         query($id: String!) {
           getVisitById(id: $id) {
            doctor{
              firstName
              lastName
              id
            }
            patient{
              firstName
              lastName
              id
            }
            description{
              value
              id
            }
             date
             id
           }
         }
       `;


export const editVisit = gql`
         mutation(
          $patientId: String!, $doctorId: String!, $descriptionId: String!, $date: Date!, $id: String!) {
            updateVisit (patientId: $patientId, doctorId: $doctorId,
             descriptionId: $descriptionId, date: $date, id: $id) {
              patientId
              doctorId
              descriptionId
              date
              id
           }
         }
       `;
