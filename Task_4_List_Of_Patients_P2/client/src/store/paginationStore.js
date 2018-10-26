import { observable, action, computed } from 'mobx';

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

  @action
  setCurrentPage(current) {
      if (current < 1 || current > this.pagesCount) {
          return;
      }
      this.currentPage = current;
  }


  @computed
  get firstVisibleButton() {
      let firstVisibleButton = this.currentPage - this.interval;
      const lastVisibleButton = this.currentPage + this.interval;

      if (firstVisibleButton <= 0) {
          firstVisibleButton = this.min;
      }

      if (lastVisibleButton >= this.pagesCount && this.pagesCount >=  this.maxVisibleButtons) {
          firstVisibleButton = this.lastVisibleButton - (this.maxVisibleButtons - 1);
      }

      return firstVisibleButton;
  }

  @computed
  get lastVisibleButton() {
      let lastVisibleButton = this.currentPage + this.interval;
      const firstVisibleButton = this.currentPage - this.interval;

      if (firstVisibleButton <= 0) {
          lastVisibleButton = this.pagesCount <= this.maxVisibleButtons ?
              this.pagesCount :
              this.maxVisibleButtons;
      }


      if (lastVisibleButton >= this.pagesCount) {
          lastVisibleButton = this.pagesCount;
      }
      return lastVisibleButton;
  }

  @action
  setBaseValues(maxVisibleButtons, totalItemsCount, pageSize) {
      debugger;
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
