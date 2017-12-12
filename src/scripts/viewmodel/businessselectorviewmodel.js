import ko from 'knockout';

export default class BusinessSelectorViewModel {
  // you just need the name and the current business
  /**
   *
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
