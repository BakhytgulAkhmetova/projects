import gql from 'graphql-tag';

export const addVisit = gql`
         mutation( $patientId: String!, $doctorId: String!, $descriptionId: String!, $date: Date!) {
           addVisit(patientId: $patientId, doctorId: $doctorId, descriptionId: $descriptionId, date: $date) {
              patient
              doctor
              description
              date }
         }`;

export const getVisitsPage = gql`
         query($skip: Int!, $limit: Int!) {
          getVisitsPage(skip: $skip, limit: $limit) {
            items {
              patient
              doctor
              description
              date
              _id }
            total }
         }`;

export const getSelectedPatients = gql`
         query($letters: String!, $skip: Int!, $limit: Int!) {
          getSelectedPatients(letters: $letters, skip: $skip, limit: $limit) {
               value
               label
           }
         } `;

export const getSelectedDoctors = gql`
       query($letters: String!, $skip: Int!, $limit: Int!) {
        getSelectedDoctors(letters: $letters, skip: $skip, limit: $limit) {
          value
          label
         }
       }`;

export const getSelectedDescriptions = gql`
     query($letters: String!, $skip: Int!, $limit: Int!) {
      getSelectedDescriptions(letters: $letters, skip: $skip, limit: $limit) {
        value
        label
       }
     }`;
export const getVisitById = gql`
         query($id: String!) {
           getVisitById(id: $id) {
            doctor {firstName, lastName, _id }
            patient {firstName, lastName, _id }
            description {value, _id }
             date
             _id }
         } `;


export const editVisit = gql`
         mutation ($patientId: String!, $doctorId: String!, $descriptionId: String!, $date: Date!, $id: String!) {
            updateVisit (patientId: $patientId, doctorId: $doctorId,
             descriptionId: $descriptionId, date: $date, id: $id) {
              patient
              doctor
              description
              date
              _id
           }
         }`;
