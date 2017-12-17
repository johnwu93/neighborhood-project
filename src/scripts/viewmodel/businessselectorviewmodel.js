import ko from 'knockout';

export default class BusinessSelectorViewModel {
  /**
   * @description a representation of a currently selected business
   * @param {KnockoutObservableArray<{name: string, id: number}>} businesses
   * @param {KnockoutObservable<number>} selectedBusinessId
   */
  constructor(businesses, selectedBusinessId) {
    this.businesses = businesses;
    this.selectedBusinessId = selectedBusinessId;
  }

  setBindings() {
    const self = this;
    const businesses = ko.pureComputed(() => self.businesses()
      .map(business => ({...business, href: `#${business.id}`}))
      , self);
    const viewModel = {
      businesses,
      selectBusinessId(newBusinessId) {
        self.selectedBusinessId(newBusinessId);
      },
    };
    ko.applyBindings(viewModel, document.getElementById('businesses'));
  }
}
