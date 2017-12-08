/**
 *  @implements {MarkerView}
 */
export default class GoogleMarkerView {
  /**
   * @description Interface representing a Marker in a map
   * @param {google.maps.Map} map
   * @param {google.maps.Marker} googleMarker
   */
  constructor(map, googleMarker) {
    this.map = map;
    this.googleMarker = googleMarker;
  }

  show() {
    this.googleMarker.setMap(this.map);
  }

  /**
   * @param {clickCallback} clickTask
   */
  onClickListener(clickTask) {
    this.googleMarker.addListener('click', clickTask);
  }
}
