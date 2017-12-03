import GeoData from './geodata';

const MARU_COFFE = new GeoData('Maru Coffe', 34.106572477771984, -118.28735127154621);

export default class MapDisplayer {
  constructor(google) {
    this.google = google;
  }

  /**
   *
   * @param {Array<GeoData>}businesses
   */
  plotPlaces(businesses) {
    const map = new this.google.maps.Map(document.getElementById('map'), {
      center: {lat: MARU_COFFE.lat, lng: MARU_COFFE.long},
      zoom: 13,
    });
    businesses.forEach(business => new this.google.maps.Marker({
      position: {lat: business.lat, lng: business.long},
      map,
      title: 'First Marker!',
    }));
  }
}
