// @flow
import Business from '../entities/business';
import MarkerView from '../view/markerview/googlemarkerview';

/**
 * @description Data that embodies a business. It also include MarkerView.
 */
export default class BusinessMarker {
  business: Business;
  marker: MarkerView;
  id: number;
  constructor(business: Business, marker: MarkerView, id: number) {
    this.business = business;
    this.marker = marker;
    this.id = id;
  }
}
