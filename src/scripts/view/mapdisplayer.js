import GPSCoordinates from '../entities/gpscoordinates';

const MARU_COFFE_COORD = new GPSCoordinates(34.106572477771984, -118.28735127154621);

export default class MapDisplayer {
  constructor(google) {
    this.google = google;
  }

  /**
   *
   * @param {Array<Business>}businesses
   */
  plotPlaces(businesses) {
    const map = new this.google.maps.Map(document.getElementById('map'), {
      center: MARU_COFFE_COORD,
      zoom: 13,
    });
    businesses.forEach((business) => {
      const {lat, lng} = business.coords;
      return new this.google.maps.Marker({
        position: {lat, lng},
        map,
        title: 'First Marker!',
      });
    });
  }
}
