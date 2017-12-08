/**
 * @implements {InfoWindowView}
 */
export default class GoogleInfoWindowView {
  /**
   * @describe Adapter to use Google's Info Window
   * @param {google.maps.Map} map
   * @param {google.maps.InfoWindow} googleInfoWindow
   */
  constructor(map, googleInfoWindow) {
    this.googleInfoWindow = googleInfoWindow;
    this.map = map;
  }

  /**
   * @param {GoogleMarkerView} marker
   * @param {string} content
   */
  display(marker, content) {
    this.googleInfoWindow.setContent(content);
    this.googleInfoWindow.open(this.map, marker.googleMarker);
  }


  // todo: use this whenever a marker using the infoWindow is filtered out
  // IntelliJ bug: could not understand usage of methods from a subclass
  // noinspection JSUnusedGlobalSymbols
  close() {
    this.googleInfoWindow.marker = null;
  }

  /**
   * @param {closingCallback} closingInfoWindowCallBack
   */
  onClose(closingInfoWindowCallBack) {
    this.googleInfoWindow.addListener('closeclick', closingInfoWindowCallBack);
  }
}
