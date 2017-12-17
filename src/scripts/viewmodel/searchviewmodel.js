import ko from 'knockout';

const myBusinesses = new WeakMap();
const myFilteredBusinessIds = new WeakMap();
export default class SearchViewModel {
  /**
   * @description Binds the query in a search bar that will show businesses whos name contains the
   * query
   * @param {KnockoutObservableArray<{id: number, name: string}>} businesses
   */
  constructor(businesses) {
    myBusinesses.set(this, businesses);
    myFilteredBusinessIds.set(this, ko.observableArray());
    this.searchQuery = ko.observable();
  }

  setBindings() {
    this.searchQuery.subscribe(this.search.bind(this));
    ko.applyBindings({
      searchQuery: this.searchQuery,
    }, document.getElementById('search'));
    this.searchQuery('');
  }

  /**
   *
   * @return {KnockoutObservableArray<number>}
   */
  getFilteredBusinessIds() {
    return myFilteredBusinessIds.get(this);
  }

  /**
   *
   * @param {string} query
   */
  search(query) {
    const business = myBusinesses.get(this)();
    const filteredBusinessIds = business
      .filter(({name}) => name.toLowerCase().search(query.toLowerCase()) !== -1)
      .map(({id}) => id);
    myFilteredBusinessIds.get(this)(filteredBusinessIds);
  }
}
