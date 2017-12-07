import ko from 'knockout';
import BusinessMarker from './businessmarker';
import MarkerViewModel from './markerviewmodel';
import InfoWindowView from '../view/infowindowview';
import InfoWindowViewModel from './infowindowviewmodel';
import MapDisplayer from '../view/mapdisplayer';
import BusinessSelectorViewModel from './businessselectorviewmodel';
import createBusinessIdPair from './viewmodelfactory';
import SearchViewModel from './searchviewmodel';

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
    const mapDisplayer = new MapDisplayer(this.googleMapFactory);
    mapDisplayer.setMap();

    const businessMarkers = this.businesses.map((business, id) => {
      const marker = this.googleMapFactory.createMarker(business.coords);
      mapDisplayer.showMarker(marker);
      return new BusinessMarker(business, marker, id);
    });

    businessMarkers.forEach((businessMarker) => {
      const markerViewModel = new MarkerViewModel(this.selectedBusinessMarker, businessMarker);
      markerViewModel.setBindings();
    });

    this.observableBusinessMarkers = ko.observableArray(businessMarkers);

    const observableBusinesses =
      ko.pureComputed(() => this.observableBusinessMarkers().map(createBusinessIdPair), this);
    const searchViewModel = new SearchViewModel(observableBusinesses);
    searchViewModel.setBindings();

    this.filteredBusinessIds = searchViewModel.getFilteredBusinessIds();

    const filteredBusinesses = ko.pureComputed(
      () => this.filteredBusinessIds().map(id => this.observableBusinessMarkers()[id].business),
      this,
    );

    const menuSelectorViewModel = new BusinessSelectorViewModel(filteredBusinesses);
    menuSelectorViewModel.setBindings();

    const infoWindowView = new InfoWindowView(
      mapDisplayer,
      this.googleMapFactory.createInfoWindow('test'),
    );

    // eslint-disable-next-line no-new
    new InfoWindowViewModel(infoWindowView, this.selectedBusinessMarker);
  }
}
