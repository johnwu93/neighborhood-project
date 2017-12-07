import GPSCoordinates from '../entities/gpscoordinates';

const MARU_COFFE_COORD = new GPSCoordinates(34.106572477771984, -118.28735127154621);

/**
 * @description Convenient methods to call Google Map Objects
 */

export default class GoogleMapFactory {
  constructor(google) {
    this.google = google;
  }

  createMap() {
    return new this.google.maps.Map(document.getElementById('map'), {
      center: MARU_COFFE_COORD,
      zoom: 15,
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
