import generateInfoWindowTemplate from './generateinfowindowtemplate';

export default class InfoWindowView {
  /**
   *
   * @param {google.maps.Map} map
   * @param {google.maps.InfoWindow} googleInfoWindow
   */
  constructor(map, googleInfoWindow) {
    this.googleInfoWindow = googleInfoWindow;
    this.map = map;
  }

  /**
   * @description when this window closes in the UI, an event will be triggered
   * @param {Function} closingInfoWindowCallBack
   */
  onClose(closingInfoWindowCallBack) {
    this.googleInfoWindow.addListener('closeclick', closingInfoWindowCallBack);
  }

  close() {
    this.googleInfoWindow.marker = null;
  }

  /**
   * @param {BusinessMarker}businessMarker
   */
  display(businessMarker) {
    this.close();
    if (businessMarker) {
      this.googleInfoWindow.setContent(generateInfoWindowTemplate(businessMarker.business));
      this.googleInfoWindow.open(this.map, businessMarker.marker.googleMarker);
    }
  }
}
