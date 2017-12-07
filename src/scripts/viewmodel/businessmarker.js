// @flow
import Business from '../entities/business';

export default class BusinessMarker {
  business: Business;
  // $FlowFixMe
  marker: google.maps.Marker;
  id: number;
  constructor(business: Business, marker: google.maps.Marker, id: number) {
    this.business = business;
    this.marker = marker;
    this.id = id;
  }
}
