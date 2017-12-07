import ko from 'knockout';
import SearchViewModel from '../../src/scripts/viewmodel/searchviewmodel';
import createBusinessIdPair from '../../src/scripts/viewmodel/viewmodelfactory';


const COFFEE = 'coffee';
const EMPTY_SEARCH = '';

describe('SearchViewModel', () => {
  beforeEach(function setup() {
    const restaurants = [
      createBusinessIdPair('Maru Coffee', 1),
      createBusinessIdPair('Starbucks Coffee', 2),
      createBusinessIdPair('Blue Bottle', 3),
    ];
    this.observableBusinesses = ko.observableArray(restaurants);
    this.searchViewModel = new SearchViewModel(this.observableBusinesses);
    this.getIds = function getIds(query) {
      this.searchViewModel.search(query);
      return this.searchViewModel.getFilteredBusinessIds()();
    };
  });

  describe('edge cases', () => {
    it('should not filter out anything if the search query is empty', function testReturnsEverything() {
      const filteredBusinessIds = this.getIds(EMPTY_SEARCH);
      expect(filteredBusinessIds).toBeArrayOfSize(this.observableBusinesses().length);
    });

    it('should have filtered list have the original list of businessses when the bindings are initially setup', function testInitialBindings() {
      this.searchViewModel.setBindings();
      const filteredBusinessIds = this.searchViewModel.getFilteredBusinessIds()();
      expect(filteredBusinessIds).toBeArrayOfSize(this.observableBusinesses().length);
    });

    it('should not return any results if no businesss\' name match with the query', function testNoMatches() {
      const filteredBusinessIds = this.getIds('qwertyuiop');
      expect(filteredBusinessIds).toBeEmptyArray();
    });
  });

  describe('search for existing output', () => {
    beforeEach(function setup() {
      this.expectedOutput = [1, 2];
    });

    it('should filter out businesses based on it\'s name', function testContainsMatch() {
      expect(this.getIds(COFFEE)).toEqual(this.expectedOutput);
    });

    it('should ensure that that the businesses input does not change as search filtered business are changed', function testUnchangedInput() {
      this.searchViewModel.search(COFFEE);
      expect(this.observableBusinesses().map(({id}) => id)).not.toEqual(this.expectedOutput);
    });

    it('should return different filtered lists if different queries are inputted', function testDifferentQueries() {
      const oldFilteredBusinessIds = this.getIds(EMPTY_SEARCH);
      const newFilteredBusinessIds = this.getIds(COFFEE);
      expect(oldFilteredBusinessIds).toBeArrayOfSize(this.observableBusinesses().length);
      expect(newFilteredBusinessIds).toEqual(this.expectedOutput);
    });
  });
});
