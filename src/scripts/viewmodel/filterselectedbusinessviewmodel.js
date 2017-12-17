export default class FilterSelectedBusinessViewModel {
  /**
   * @description contains a subset of businesses. This subset of data is determined by the search
   * filter. Markers in Google maps will only be show through this subset.
   * @param {KnockoutObservableArray<number>} visibleBusinessIds
   * @param {KnockoutObservable<number>} selectedBusinessId,
   */
  constructor(visibleBusinessIds, selectedBusinessId) {
    this.visibleBusinessIds = visibleBusinessIds;
    this.selectedBusinessId = selectedBusinessId;
  }

  setup() {
    this.visibleBusinessIds.subscribe(this.determineSelectability.bind(this));
  }

  /**
   *
   * @param {Array<number>}visibleBusinessIds
   */
  determineSelectability(visibleBusinessIds) {
    if (!visibleBusinessIds.includes(this.selectedBusinessId())) {
      this.selectedBusinessId(null);
    }
  }
}
