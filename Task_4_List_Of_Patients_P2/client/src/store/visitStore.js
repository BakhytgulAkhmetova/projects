import { observable, action, runInAction } from 'mobx';

import { baseUrl, port, viewitems } from '../constants';
import { addVisit, getVisitsPage, editVisit, getVisitById } from './api/visit';
import { getSelectedPatients, getSelectedDoctors, getSelectedDescriptions } from '../store/api/visit';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: `${baseUrl + port}/graphql`
});

class VisitStore {
  @observable visitList = [];

  @observable count = 0;

  @observable currentPage = 1;

  @observable visit = {
      patient: { value: 'Id', label: 'patient' },
      doctor: { value: 'Id', label: '' },
      description: { value: 'Id', label: '' },
      date: new Date()
  };;

  @action
  async getSelectedPatients(letters) {
      let patients;
      const result = await client.query({
          query: getSelectedPatients,
          variables: { letters },
          fetchPolicy: 'no-cache'
      });

      runInAction(() => {
          patients =  result.data.getSelectedPatients;
      });
      return patients;
  }

  @action
  async getSelectedDoctors(letters) {
      let doctors;
      const result = await client.query({
          query: getSelectedDoctors,
          variables: { letters },
          fetchPolicy: 'no-cache'
      });

      runInAction(() => {
          doctors =  result.data.getSelectedDoctors;
      });
      return doctors;
  }

  @action
  async addVisit(visit) {
      this.visit = visit;
      return await client.mutate({
          mutation: addVisit,
          variables: {
              patientId: this.visit.patient,
              doctorId: this.visit.doctor,
              descriptionId: this.visit.description,
              date: this.visit.date
          },
          fetchPolicy: 'no-cache'
      });
  }

  @action
  async editPatient() {
      await client.mutate({
          mutation: editVisit,
          variables: {
              firstName: this.patient.firstName.value,
              lastName: this.patient.lastName.value
          },
          fetchPolicy: 'no-cache'
      });
  }

  @action
  async getVisitById(id) {
      const result = await client.query({
          query: getVisitById,
          variables: { id },
          fetchPolicy: 'no-cache'
      });

      runInAction(() => {
          const visitFound = result.data.getVisitById;

          this.visit.patient.label = visitFound.patient;
          this.visit.doctor.label = visitFound.doctor;
          this.visit.description.label = visitFound.description;
          this.visit.date = visitFound.date;
          this.visit.id = id;
      });
  }

  @action
  async getSelectedDescriptions(letters) {
      let descriptions;
      const result = await client.query({
          query: getSelectedDescriptions,
          variables: { letters },
          fetchPolicy: 'no-cache'
      });

      runInAction(() => {
          descriptions =  result.data.getSelectedDescriptions;
      });
      return descriptions;
  }
  @action
  async getVisitPage(pageNumber) {
      const skip = (pageNumber - 1) * viewitems;
      const result = await client.query({
          query: getVisitsPage,
          variables: {
              skip,
              limit: viewitems
          },
          fetchPolicy: 'no-cache'
      });

      runInAction(() => {
          this.visitList = result.data.getVisitsPage.items;
          this.count = result.data.getVisitsPage.total;
          this.currentPage = pageNumber;
      });
  }
}

export default new VisitStore();
