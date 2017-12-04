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
    businessMarker.marker.addListener('click', this.onClickMarker.bind(this, businessMarker));
  }

  /**
   *
   * @param {BusinessMarker} businessMarker
   */
  onClickMarker(businessMarker) {
    this.observableSelectedBusinessMarker(businessMarker);
  }
}

