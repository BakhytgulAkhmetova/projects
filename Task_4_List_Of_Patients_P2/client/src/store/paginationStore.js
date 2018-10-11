import { observable, action } from 'mobx';

import { setButtonsCount } from '../utils';

class PaginationStore {
  @observable
  maxVisibleButtons = 1;

  min = 1;

  @observable
  pagesCount = 0;

  @observable
  currentPage = 1;

  @observable
  interval = 0;

  @observable
  firstVisibleButton = this.min;

  @observable
  lastVisibleButton = 0;

  @action
  setCurrentPage(current) {
      if (current < 1 || current > this.pagesCount) {
          return;
      }
      this.currentPage = current;

      this.firstVisibleButton = this.currentPage - this.interval;
      this.lastVisibleButton = this.currentPage + this.interval;
      if (this.firstVisibleButton <= 0) {
          this.firstVisibleButton = this.min;
          this.lastVisibleButton = this.pagesCount <= this.maxVisibleButtons ?
              this.pagesCount :
              this.maxVisibleButtons;
      }


      if (this.lastVisibleButton >= this.pagesCount) {
          this.lastVisibleButton = this.pagesCount;
          this.firstVisibleButton = this.lastVisibleButton - (this.maxVisibleButtons - 1);
      }
  }

  @action
  setBaseValues(maxVisibleButtons, totalItemsCount, pageSize) {
      this.maxVisibleButtons = maxVisibleButtons;
      this.interval = (maxVisibleButtons - 1) / 2;
      const pagesCount = setButtonsCount(totalItemsCount, pageSize);


      if (this.pagesCount !== pagesCount) {
          this.pagesCount = pagesCount;
          this.setCurrentPage(this.currentPage);
      }
  }
}

export default new PaginationStore();
