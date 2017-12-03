import GPSCoordinates from '../entities/gpscoordinates';

const MARU_COFFE_COORD = new GPSCoordinates(34.106572477771984, -118.28735127154621);

export default class MapDisplayer {
  /**
   * @param {GoogleMapFactory} googleMapFactory
   */
  constructor(googleMapFactory) {
    this.googleMapFactory = googleMapFactory;
  }

  setMap() {
    this.map = this.googleMapFactory.createMap(MARU_COFFE_COORD, 13);
  }

  /**
   *
   * @param {google.maps.Marker} marker
   */
  showMarker(marker) {
    marker.setMap(this.map);
  }

  /**
   *
   * @param {google.maps.Marker} marker
   * @param {google.maps.InfoWindow} infoWindow
   */
  displayInfoWindow(marker, infoWindow) {
    // Look at the current info window
    infoWindow.open(this.map, marker);
  }
}
