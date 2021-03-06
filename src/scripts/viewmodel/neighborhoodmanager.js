import ko from 'knockout';
import _ from 'lodash';
import BusinessMarker from './businessmarker';
import MarkerViewModel from './markerviewmodel';
import GoogleInfoWindowView from '../view/infowindow/googleinfowindowview';
import InfoWindowViewModel from './infowindowviewmodel';
import BusinessSelectorViewModel from './businessselectorviewmodel';
import SearchViewModel from './searchviewmodel';
import MarkerView from '../view/markerview/googlemarkerview';
import { MarkerListViewModel } from './markerlistviewmodel';
import FilterSelectedBusinessViewModel from './filterselectedbusinessviewmodel';
import SelectedBusinessViewModel from './selectedbusinessviewmodel';
import bindHeader from './headerviewmodel';
import SelectedMarkerViewModel from './selectedmarkerviewmodel';

/**
 *
 * @param {BusinessMarker} businessMarker
 */
const convertNameIdPair = function convertNameIdPair({id, business}) {
  const {name} = business;
  return {id, name};
};
/**
 * @description controls the state of the project and wraps abouts around bindings
 * @property {KnockoutObservable<BusinessMarker>} selectedBusinessMarker
 * @property {Array<BusinessMarker>} businessMarkers
 */
export default class NeighborhoodManager {
  /**
   * @param {BusinessScraperViewModel} retriever
   * @param {GoogleMapFactory} googleMapFactory
   * @property {KnockoutObservable<BusinessMarker>}selectedBusinessMarker
   */
  constructor(retriever, googleMapFactory) {
    this.googleMapFactory = googleMapFactory;
    this.retriever = retriever;
  }

  /**
   * @description set up asyncs, such as Google Maps
   * @return {Promise.<void>}
   */
  async initialize() {
    const businessesPromise = this.retriever.fetch();
    this.map = this.googleMapFactory.createMap();
    this.setupViews(await businessesPromise);
  }

  /**
   * @describe creates the binds and the necessary bindings to display each ViewModel component
   * @param {[Business]} businesses
   */
  setupViews(businesses) {
    const markers = businesses.map(business =>
      new MarkerView(this.map, this.googleMapFactory.createMarker(business.coords)),
    );

    // noinspection JSUnresolvedFunction
    const businessMarkers = _.unzip([businesses, markers]).map(
      ([business, marker], id) => new BusinessMarker(business, marker, id),
    );

    const selectedBusiness = new SelectedBusinessViewModel(businessMarkers);
    selectedBusiness.setup();

    businessMarkers.forEach(({id, marker}) => {
      const markerViewModel = new MarkerViewModel(selectedBusiness.observableId, id, marker);
      markerViewModel.setBindings();
    });

    this.observableBusinessMarkers = ko.observableArray(businessMarkers);

    const observableNameIdPair =
      ko.pureComputed(() => this.observableBusinessMarkers().map(convertNameIdPair), this);
    const searchViewModel = new SearchViewModel(observableNameIdPair);
    searchViewModel.setBindings();

    this.filteredBusinessIds = searchViewModel.getFilteredBusinessIds();

    const filterSelectedBusinessViewModel =
      new FilterSelectedBusinessViewModel(this.filteredBusinessIds, selectedBusiness.observableId);
    filterSelectedBusinessViewModel.setup();

    const filteredNameIdPair = ko.pureComputed(
      () => this.filteredBusinessIds().map(id => observableNameIdPair()[id]),
      this,
    );

    const menuSelectorViewModel = new BusinessSelectorViewModel(
      filteredNameIdPair,
      selectedBusiness.observableId,
    );
    menuSelectorViewModel.setBindings();

    const infoWindowView = new GoogleInfoWindowView(
      this.map,
      this.googleMapFactory.createInfoWindow('test'),
    );

    const infoWindowViewModel = new InfoWindowViewModel(
      infoWindowView,
      selectedBusiness.observableBusinessMarker,
    );
    infoWindowViewModel.setup();

    const filteredMarkers = ko.pureComputed(
      () => this.filteredBusinessIds().map(id => markers[id]),
      this,
    );

    const selectedMarker = ko.pureComputed(() => {
      const businessMarker = selectedBusiness.observableBusinessMarker();
      return businessMarker === null ? null : businessMarker.marker;
    });

    const selectedMarkerViewModel = new SelectedMarkerViewModel(selectedMarker);
    selectedMarkerViewModel.setup();

    const markerListViewModel = new MarkerListViewModel(markers, filteredMarkers);
    markerListViewModel.setup();

    bindHeader();
  }
}
