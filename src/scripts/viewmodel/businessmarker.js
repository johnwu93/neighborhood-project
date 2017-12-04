// @flow
import Business from '../entities/business';

export default class BusinessMarker {
  business: Business;
  // $FlowFixMe
  marker: google.maps.Marker;
  constructor(business: Business, marker: google.maps.Marker) {
    this.business = business;
    this.marker = marker;
  }
}
