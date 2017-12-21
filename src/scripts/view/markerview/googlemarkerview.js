/**
 *  @implements {MarkerView}
 */
export default class GoogleMarkerView {
  /**
   * @description Interface representing a Marker in a map for Google Maps
   * @param {google.maps.Map} map
   * @param {google.maps.Marker} googleMarker
   */
  constructor(map, googleMarker) {
    this.map = map;
    this.googleMarker = googleMarker;
    this.googleMarker.setMap(map);
    this.googleMarker.setVisible(false);
  }

  show() {
    this.googleMarker.setVisible(true);
  }

  close() {
    this.googleMarker.setVisible(false);
  }

  bounce() {
    this.googleMarker.setAnimation(4);
  }

  zoom() {
    this.map.panTo(this.googleMarker.getPosition());
  }

  /**
   * @param {clickCallback} clickTask
   */
  onClickListener(clickTask) {
    this.googleMarker.addListener('click', clickTask);
  }
}
