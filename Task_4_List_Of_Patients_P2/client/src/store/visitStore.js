import { observable, action, runInAction } from 'mobx';

import { visitList } from './data/data';
import { baseUrl, port } from '../constants';
import { getSelectedPatients } from '../store/api/visit';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: `${baseUrl + port}/graphql`
});

class VisitStore {
  @observable
  visitList = [];

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
      debugger;
      return patients;
  }
}

export default new VisitStore();
