import ko from 'knockout';

export default class BusinessSelectorViewModel {
  /**
   *
   * @param {KnockoutObservableArray<Business>} businesses
   */
  constructor(businesses) {
    this.businesses = businesses;
  }

  setBindings() {
    ko.applyBindings({businesses: this.businesses}, document.getElementById('businesses'));
  }
}
