import ko from 'knockout';
import SearchViewModel from '../../src/scripts/viewmodel/searchviewmodel';
import { createRestaurants, THE_THIRSTY_CROW } from '../../src/scripts/view/restaurants';

describe('SearchViewModel', () => {
  beforeEach(function setup() {
    this.observableBusinesses = ko.observableArray(createRestaurants());
    this.searchViewModel = new SearchViewModel(this.observableBusinesses);
  });

  it('should not filter out anything if the search query is empty', function testReturnsEverything() {
    this.searchViewModel.search('');
    const filteredBusiness = this.searchViewModel.getFilteredBusiness();
    expect(filteredBusiness()).toBeArrayOfSize(this.observableBusinesses().length);
  });

  it('should have filtered list have the original list of businessses when the bindings are initially setup', function testInitialBindings() {
    this.searchViewModel.setBindings();
    const filteredBusiness = this.searchViewModel.getFilteredBusiness();
    expect(filteredBusiness()).toBeArrayOfSize(this.observableBusinesses().length);
  });

  it('should not return any results if no businesss\' name match with the query', function testNoMatches() {
    this.searchViewModel.search('qwertyuiop');
    const filteredBusiness = this.searchViewModel.getFilteredBusiness();
    expect(filteredBusiness()).toBeEmptyArray();
  });

  it('should filter out businesses based on it\'s name', function testContainsMatch() {
    this.searchViewModel.search('thirsty');
    const filteredBusiness = this.searchViewModel.getFilteredBusiness();
    const businessNames = filteredBusiness().map(({name}) => name);
    expect(businessNames).toEqual(['The Thirsty Crow']);
  });

  it('should ensure that that the businesses input does not change as search filtered business are changed', function testUnchangedInput() {
    this.searchViewModel.search('thirsty');
    const businessNames = this.observableBusinesses().map(({name}) => name);
    expect(businessNames).not.toEqual([THE_THIRSTY_CROW]);
  });

  it('should return different filtered lists if different queries are inputted', function testDifferentQueries() {
    this.searchViewModel.search('');
    const oldFilteredBusiness = this.searchViewModel.getFilteredBusiness()();
    this.searchViewModel.search('thirsty');
    const filteredBusiness = this.searchViewModel.getFilteredBusiness();
    const businessNames = filteredBusiness().map(({name}) => name);
    expect(oldFilteredBusiness).toBeArrayOfSize(this.observableBusinesses().length);
    expect(businessNames).toEqual([THE_THIRSTY_CROW]);
  });
});
