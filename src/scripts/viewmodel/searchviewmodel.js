import ko from 'knockout';

const myBusinesses = new WeakMap();
const myFilteredBusinesses = new WeakMap();
export default class SearchViewModel {
  /**
   *
   * @param {KnockoutObservableArray<Business>}businesses
   */
  constructor(businesses) {
    myBusinesses.set(this, businesses);
    myFilteredBusinesses.set(this, ko.observableArray());
  }

  getFilteredBusiness() {
    return myFilteredBusinesses.get(this);
  }

  /**
   *
   * @param {string} query
   */
  search(query) {
    const business = myBusinesses.get(this)();
    const filteredResults = business
      .filter(({name}) => name.toLowerCase().search(query.toLowerCase()) !== -1);
    myFilteredBusinesses.get(this)(filteredResults);
  }
}
