import ko from 'knockout';
import FilterSelectedBusinessViewModel from '../../src/scripts/viewmodel/filterselectedbusinessviewmodel';


describe('FilterSelectedBusinessViewModel', () => {
  beforeEach(function setup() {
    /**
     *
     * @param {KnockoutObservable<number>}selectedBusinessId
     */
    this.determineSelectability = function determineSelectability(selectedBusinessId) {
      const filterSelectedBusinessViewModel =
        new FilterSelectedBusinessViewModel(null, selectedBusinessId);
      filterSelectedBusinessViewModel.determineSelectability([1, 2, 3]);
    };
  });

  describe('determineSelectability', () => {
    it('should set business id to null when there are no business ids selected', function testNoBusinessIds() {
      const selectedBusinessId = ko.observable(0);
      this.determineSelectability(selectedBusinessId);

      expect(selectedBusinessId()).toBeNull();
    });

    it('should not modify business id to null when the business id is in filter list', function testExistingBusinessIds() {
      const selectedBusinessId = ko.observable(1);
      this.determineSelectability(selectedBusinessId);

      expect(selectedBusinessId()).toBe(1);
    });
  });

  describe('filtered list on change', () => {
    it('should set business id to null if the visible list changes and the business id is not in the visible list', () => {
      const selectedBusinessId = ko.observable(1);
      const visibleBusinessIds = ko.observableArray([1, 2, 3]);
      const filterSelectedBusinessViewModel =
        new FilterSelectedBusinessViewModel(visibleBusinessIds, selectedBusinessId);
      filterSelectedBusinessViewModel.setup();

      visibleBusinessIds([2, 3]);
      expect(selectedBusinessId()).toBeNull();
    });
  });
});
