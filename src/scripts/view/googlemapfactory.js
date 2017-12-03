/**
 * @description Convenient methods to call Google Map Objects
 */

export default class GoogleMapFactory {
  constructor(google) {
    this.google = google;
  }

  /**
   * @param {GPSCoordinates} center
   * @param {number} zoom
   */
  createMap(center, zoom) {
    return new this.google.maps.Map(document.getElementById('map'), {
      center,
      zoom,
    });
  }

  /**
   * @param {GPSCoordinates} gpsCoordinates
   * @return {google.maps.Marker}
   */
  createMarker(gpsCoordinates) {
    return new this.google.maps.Marker({
      position: gpsCoordinates,
    });
  }

  /**
   *
   * @param content
   * @return {google.maps.InfoWindow}
   */
  createInfoWindow(content) {
    return new this.google.maps.InfoWindow({
      content,
    });
  }
}
