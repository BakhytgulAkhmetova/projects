import { observable, action, runInAction } from 'mobx';

import { visitList, emptyVisit } from './data/data';
import { baseUrl, port } from '../constants';
import { getSelectedPatients, getSelectedDoctors, getSelectedDescriptions } from '../store/api/visit';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: `${baseUrl + port}/graphql`
});

class VisitStore {
  @observable
  visitList = [];

  @observable
  visit = emptyVisit;

  @action
  getAllVisits() {
      this.visitList = visitList;
  }

  @action
  onChangePatientOption(letters) {
      this.patient.label = letters;
  }

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
}

export default new VisitStore();
