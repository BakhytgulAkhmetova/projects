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

  @observable
  count

  @observable
  patient = { value: 'patientId', label: 'value' };

    //   @observable
    //   patientList = [];

  @action
  getAllVisits(pageNumber) {
      this.visitList = visitList;
      this.count = visitList.length;
  }

  @action
  onChangePatientOption(letters) {
      this.patient.label = letters;
  }

  @action
  async getSelectedPatients(letters) {
      const result = await client.query({
          query: getSelectedPatients,
          variables: { letters },
          fetchPolicy: 'no-cache'
      });

      runInAction(() => {
          return result.data.getSelectedPatients;
      });
  }
}

export default new VisitStore();
