import ko from 'knockout';
import BusinessMarker from './businessmarker';
import MarkerViewModel from './markerviewmodel';
import GoogleInfoWindowView from '../view/infowindow/googleinfowindowview';
import InfoWindowViewModel from './infowindowviewmodel';
import BusinessSelectorViewModel from './businessselectorviewmodel';
import SearchViewModel from './searchviewmodel';
import MarkerView from '../view/markerview/googlemarkerview';

/**
 *
 * @param {BusinessMarker} businessMarker
 */
const convertNameIdPair = function convertNameIdPair({id, business}) {
  const {name} = business;
  return {id, name};
};
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
    this.selectedBusinessId = ko.observable();
    this.googleMapFactory = googleMapFactory;
    this.businesses = businesses;
  }

  /**
   * @describe creates the binds and the necessary bindings to display map
   * @property {Array<BusinessMarker>} businessMarkers
   */
  setup() {
    const map = this.googleMapFactory.createMap();

    const businessMarkers = this.businesses.map((business, id) => {
      const markerView = new MarkerView(map, this.googleMapFactory.createMarker(business.coords));
      markerView.show();
      return new BusinessMarker(business, markerView, id);
    });

    this.selectedBusinessMarker = ko.pureComputed(() => {
      const id = this.selectedBusinessId();
      return businessMarkers[id];
    }, this);

    businessMarkers.forEach(({id, marker}) => {
      const markerViewModel = new MarkerViewModel(this.selectedBusinessId, id, marker);
      markerViewModel.setBindings();
    });

    this.observableBusinessMarkers = ko.observableArray(businessMarkers);

    const observableNameIdPair =
      ko.pureComputed(() => this.observableBusinessMarkers().map(convertNameIdPair), this);
    const searchViewModel = new SearchViewModel(observableNameIdPair);
    searchViewModel.setBindings();

    this.filteredBusinessIds = searchViewModel.getFilteredBusinessIds();

    const filteredNameIdPair = ko.pureComputed(
      () => this.filteredBusinessIds().map(id => observableNameIdPair()[id]),
      this,
    );

    const menuSelectorViewModel = new BusinessSelectorViewModel(
      filteredNameIdPair,
      this.selectedBusinessId,
    );
    menuSelectorViewModel.setBindings();

    const infoWindowView = new GoogleInfoWindowView(
      map,
      this.googleMapFactory.createInfoWindow('test'),
    );

    const infoWindowViewModel = new InfoWindowViewModel(
      infoWindowView,
      this.selectedBusinessMarker,
    );
    infoWindowViewModel.setup();
  }
}
