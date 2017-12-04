/**
 * @description controls the state of the project and wraps abouts around bindins
 */
import BusinessMarker from './businessmarker';

/**
 *
 * @param {Business} thisBusiness
 * @param {Business} thatBusiness
 */
const isEqualBusinesses = function isEqualBusinesses(thisBusiness, thatBusiness) {
  return thisBusiness.name === thatBusiness.name && thisBusiness.address === thatBusiness.address;
};

export default class NeighborhoodManager {
  /**
   * @callback markerCreatorCallback
   * @param {GPSCoordinates}
   * @return {google.maps.Marker}
   */

  /**
   * @callback markerClickCallback
   * @param {BusinessMarker}
   */


  /**
   *
   * @param {Array<Business>} businesses
   * @param {markerCreatorCallback} markerCreatorTask
   * @param {InfoWindow} infoWindow
   */
  constructor(businesses, markerCreatorTask, infoWindow) {
    this.selectedBusinessMarker = null;
    this.businessMarkers = businesses.map(business =>
      new BusinessMarker(business, markerCreatorTask(business.coords)),
    );
    this.googleInfoWindow = infoWindow;
  }

  setSelectedBusiness(newBusinessMarker) {
    if (
      this.selectedBusinessMarker === null ||
      !isEqualBusinesses(this.selectedBusinessMarker.business, newBusinessMarker.business)
    ) {
      this.selectedBusinessMarker = newBusinessMarker;
      this.googleInfoWindow.display(newBusinessMarker);
    }
  }

  /**
   *
   * @param {markerClickCallback} markerClickCallback
   */
  setMarkerClickCallback(markerClickCallback) {
    this.markerClickCallback = markerClickCallback;
  }

  setBindings() {
    this.businessMarkers.forEach((businessMarker) => {
      // the context for markerClickCallback may change
      businessMarker.marker.addListener('click', () => this.markerClickCallback(businessMarker));
    });
  }
}
