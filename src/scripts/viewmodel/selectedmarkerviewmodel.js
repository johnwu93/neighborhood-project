/**
 *
 * @param {MarkerView} marker
 */
const bounce = function bounce(marker) {
  if (marker !== null) {
    marker.bounce();
  }
};


export default class SelectedMarkerViewModel {
  /**
   *
   * @param {KnockoutObservable<MarkerView>}marker
   */
  constructor(marker) {
    this.marker = marker;
  }

  setup() {
    this.marker.subscribe(bounce);
  }
}
