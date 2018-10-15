import { observable, action, runInAction } from 'mobx';

import { visitList } from './data/data';
import { baseUrl, port, viewitems } from '../constants';
import { getVisitsPage } from '../store/api/visit';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: `${baseUrl + port}/graphql`
});

class VisitStore {
  @observable
  visitList = [];

  @observable
  count

  @action
  getAllVisits(pageNumber) {
      this.visitList = visitList;
      this.count = visitList.length;
  }

  @action
  async getVisitsPage(pageNumber) {
      try {
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
          });
      } catch (error) {
          throw error;
      }
  }
}

export default new VisitStore();
