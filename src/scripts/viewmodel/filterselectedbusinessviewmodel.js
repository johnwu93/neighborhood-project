export default class FilterSelectedBusinessViewModel {
  /**
   *
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
