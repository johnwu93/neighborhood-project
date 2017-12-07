/**
 * ModelView that interacts with Marker
 */
export default class MarkerViewModel {
  /**
   *
   * @param {KnockoutObservable<BusinessMarker>} observableSelectedBusinessMarker
   * @param {BusinessMarker} businessMarker
   */
  constructor(observableSelectedBusinessMarker, businessMarker) {
    this.observableSelectedBusinessMarker = observableSelectedBusinessMarker;
    this.businessMarker = businessMarker;
  }

  setBindings() {
    this.businessMarker.marker.onClickListener(this.onClickMarker.bind(this, this.businessMarker));
  }

  /**
   *
   * @param {BusinessMarker} businessMarker
   */
  onClickMarker(businessMarker) {
    this.observableSelectedBusinessMarker(businessMarker);
  }
}

