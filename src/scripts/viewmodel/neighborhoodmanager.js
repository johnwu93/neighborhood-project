import ko from 'knockout';
import BusinessMarker from './businessmarker';
import MarkerViewModel from './markerviewmodel';
import InfoWindowView from '../view/infowindowview';
import InfoWindowViewModel from './infowindowviewmodel';
import MapDisplayer from '../view/mapdisplayer';

/**
 * @description controls the state of the project and wraps abouts around bindins
 * @property {KnockoutObservable<BusinessMarker>} selectedBusinessMarker
 * @property {Array<BusinessMarker>} businessMarkers
 */
export default class NeighborhoodManager {
  /**
   * @param {Array<Business>} businesses
   * @param {GoogleMapFactory} googleMapFactory
   * @property {KnockoutObservable<BusinessMarker>}selectedBusinessMarker
   */
  constructor(businesses, googleMapFactory) {
    this.selectedBusinessMarker = ko.observable();
    this.googleMapFactory = googleMapFactory;
    this.businesses = businesses;
  }

  /**
   * @describe creates the binds and the necessary bindings to display map
   * @property {Array<BusinessMarker>} businessMarkers
   */
  setup() {
    // const googleMapFactory = new GoogleMapFactory(google);
    // const mapDisplayer = new MapDisplayer(googleMapFactory);
    // mapDisplayer.setMap();
    // const businesses = createRestaurants();
    //
    // const neighborhoodManager = new NeighborhoodManager(
    //   businesses,
    //   googleMapFactory.createMarker,
    //   new InfoWindow(mapDisplayer, googleMapFactory.createInfoWindow('')),
    // );
    //
    // neighborhoodManager.businessMarkers.forEach(({marker}) => mapDisplayer.showMarker(marker));
    // neighborhoodManager.setMarkerClickCallback(
    //   neighborhoodManager.setSelectedBusiness.bind(neighborhoodManager),
    // );
    //
    // neighborhoodManager.setBindings();


    const mapDisplayer = new MapDisplayer(this.googleMapFactory);
    mapDisplayer.setMap();

    const businessMarkers = this.businesses.map((business) => {
      const marker = this.googleMapFactory.createMarker(business.coords);
      mapDisplayer.showMarker(marker);
      return new BusinessMarker(business, marker);
    });
    businessMarkers.forEach(businessMarker =>
      new MarkerViewModel(this.selectedBusinessMarker, businessMarker),
    );

    const infoWindowView = new InfoWindowView(
      mapDisplayer,
      this.googleMapFactory.createInfoWindow('test'),
    );

    // eslint-disable-next-line no-new
    new InfoWindowViewModel(infoWindowView, this.selectedBusinessMarker);
  }
}
