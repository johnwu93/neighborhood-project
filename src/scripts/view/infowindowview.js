import generateInfoWindowTemplate from './generateinfowindowtemplate';

export default class InfoWindowView {
  /**
   *
   * @param {MapDisplayer} mapDisplayer
   * @param {google.maps.InfoWindow} googleInfoWindow
   */
  constructor(mapDisplayer, googleInfoWindow) {
    this.googleInfoWindow = googleInfoWindow;
    this.mapDisplayer = mapDisplayer;
  }

  /**
   * @param {Function} closingInfoWindowCallBack
   */
  onClose(closingInfoWindowCallBack) {
    // when this window closes in the UI, an event will be triggered
    this.googleInfoWindow.addListener('closeclick', closingInfoWindowCallBack);
  }

  close() {
    this.googleInfoWindow.marker = null;
  }

  /**
   *
   * @param {BusinessMarker}businessMarker
   */
  display(businessMarker) {
    this.close();
    if (businessMarker) {
      this.googleInfoWindow.setContent(generateInfoWindowTemplate(businessMarker.business));
      this.mapDisplayer.displayInfoWindow(businessMarker.marker, this.googleInfoWindow);
    }
  }
}
