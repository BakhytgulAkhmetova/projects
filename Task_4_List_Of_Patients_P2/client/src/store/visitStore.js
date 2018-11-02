import { observable, action, runInAction } from 'mobx';

import { emptyVisit } from '../store/data/data';
import { baseUrl, port, viewitems } from '../constants';
import { addVisit, getVisitsPage, editVisit, getVisitById } from './api/visit';
import moment from 'moment';
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
  cleanVisitFields() {
      this.visit = emptyVisit;
  }

  @action
  async getSelectedPatients(letters) {
      let patients;
      const result = await client.query({
          query: getSelectedPatients,
          variables: {
              letters,
              skip: 0,
              limit: viewitems },
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
          variables: {
              letters,
              skip: 0,
              limit: viewitems },
          fetchPolicy: 'no-cache'
      });

      runInAction(() => {
          doctors =  result.data.getSelectedDoctors;
      });
      return doctors;
  }

  @action
  async addVisit(visit) {
      return await client.mutate({
          mutation: addVisit,
          variables: {
              patientId: visit.patient.value,
              doctorId: visit.doctor.value,
              descriptionId: visit.description.value,
              date: visit.date.value._d
          },
          fetchPolicy: 'no-cache'
      });
  }

  @action
  async editVisit(visit) {
      await client.mutate({
          mutation: editVisit,
          variables: {
              patientId: visit.patient.value,
              doctorId: visit.doctor.value,
              descriptionId: visit.description.value,
              date: visit.date.value._d,
              id: visit.id.value
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
          this.visit.patient.value = visitFound.patient._id;
          this.visit.doctor.value = visitFound.doctor._id;
          this.visit.description.value = visitFound.description._id;
          this.visit.date.value = moment(visitFound.date);
          this.visit.id.value = id;
      });
  }

  @action
  async getSelectedDescriptions(letters) {
      let descriptions;
      const result = await client.query({
          query: getSelectedDescriptions,
          variables: {
              letters,
              skip: 0,
              limit: viewitems },
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
