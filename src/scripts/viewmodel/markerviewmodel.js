/**
 * ModelView that interacts with Marker
 */
export default class MarkerViewModel {
  /**
   * @description Whenever a marker is clicked, it is selected as the current business
   * @param {KnockoutObservable<number>} observableSelectedBusinessId
   * @param {number} businessId
   * @param {MarkerView} marker
   */
  constructor(observableSelectedBusinessId, businessId, marker) {
    this.observableSelectedBusinessId = observableSelectedBusinessId;
    this.businessId = businessId;
    this.marker = marker;
  }

  setBindings() {
    this.marker.onClickListener(this.selectBusinessId.bind(this, this.businessId));
  }

  /**
   * @param {number} newBusinessId
   */
  selectBusinessId(newBusinessId) {
    this.observableSelectedBusinessId(newBusinessId);
  }
}

