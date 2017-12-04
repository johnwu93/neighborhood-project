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

  close() {
    this.googleInfoWindow.marker = null;
  }

  /**
   *
   * @param {BusinessMarker}businessMarker
   */
  display(businessMarker) {
    this.close();
    this.googleInfoWindow.setContent(generateInfoWindowTemplate(businessMarker.business));
    this.mapDisplayer.displayInfoWindow(businessMarker.marker, this.googleInfoWindow);
  }
}
