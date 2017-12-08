/**
 * ModelView that interacts with Marker
 */
export default class MarkerViewModel {
  /**
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
    this.marker.onClickListener(this.selectBusinessMarker.bind(this, this.businessId));
  }

  /**
   * @param {BusinessMarker} businessMarker
   */
  selectBusinessMarker(businessMarker) {
    this.observableSelectedBusinessId(businessMarker);
  }
}

