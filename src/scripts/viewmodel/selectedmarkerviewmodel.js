/**
 *
 * @param {MarkerView} marker
 */
const bounce = function bounce(marker) {
  if (marker !== null) {
    marker.bounce();
  }
};


/**
 *
 * @param {MarkerView} marker
 */
const zoom = function zoom(marker) {
  if (marker !== null) {
    marker.zoom();
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
    this.marker.subscribe(zoom);
  }
}
