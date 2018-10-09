import { observable, action } from 'mobx';

import { visitList } from './data/data';

class VisitStore {
  @observable
  visitList = [];

  @action
  getAllVisits() {
      this.visitList = visitList;
  }
}

export default new VisitStore();
