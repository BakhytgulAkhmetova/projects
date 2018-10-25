import { observable, action, runInAction } from 'mobx';

import { emptyVisit } from '../store/data/data';
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

  @observable visit = emptyVisit;

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
      this.visit.patient = visit.patientId;
      this.visit.doctor = visit.doctorId;
      this.visit.description = visit.descriptionId;
      this.visit.date = visit.date;
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
  async editVisit(visit) {
      debugger;
      this.visit.patient.value = visit.patient.value;
      this.visit.doctor.value = visit.doctor.value;
      this.visit.description.value = visit.description.value;
      this.visit.date = visit.date;
      await client.mutate({
          mutation: editVisit,
          variables: {
              patientId: this.visit.patient.value,
              doctorId: this.visit.doctor.value,
              descriptionId: this.visit.description.value,
              date: this.visit.date,
              id: this.visit.id
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

          this.visit.patient.label = visitFound.patient.firstName + visitFound.patient.lastName;
          this.visit.doctor.label = visitFound.doctor.firstName + visitFound.doctor.lastName;
          this.visit.description.label = visitFound.description.value;
          this.visit.patient.value = visitFound.patient.id;
          this.visit.doctor.value = visitFound.doctor.id;
          this.visit.description.value = visitFound.description.id;
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
