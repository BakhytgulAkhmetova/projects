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
export const getVisitById = gql`
         query($id: String!) {
           getVisitById(id: $id) {
             patient
             doctor
             description
             date
             id
           }
         }
       `;


export const editVisit = gql`
         mutation(
          $patientId: String!, $doctorId: String!, $descriptionId: String!, $date: String!) {
           updateVisit( patientId: $patientId, doctorId: $doctorId,
             descriptionId: $descriptionId, date: $date, id: $id) {
              patientId
              doctorId
              descriptionId
              date
           }
         }
       `;
