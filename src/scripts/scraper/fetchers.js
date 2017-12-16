// @flow

import type { WrappedVenue } from './foursquare/retrievermethods';
import { getAddress, getCoordinates, getRating } from './foursquare/retrievermethods';
import GPSCoordinates from '../entities/gpscoordinates';

export type ScrapedBusinessInfo = {
  rating: ?number,
  address: ?string,
  coords: ?GPSCoordinates,
}


async function fetchData<ValueT, ResultT>(
  inputPromise: Promise<ValueT>,
  task: (ValueT) => ResultT,
): Promise<?ResultT> {
  try {
    const input = await inputPromise;
    return task(input);
  } catch (errow) {
    return null;
  }
}


async function fetchBusinessInfo(
  businessInfoPromise: Promise<WrappedVenue>,
): Promise<ScrapedBusinessInfo> {
  try {
    const businessInfo = await businessInfoPromise;
    return {
      rating: getRating(businessInfo),
      address: getAddress(businessInfo),
      coords: getCoordinates(businessInfo),
    };
  } catch (error) {
    return {rating: null, address: null, coords: null};
  }
}


export { fetchData, fetchBusinessInfo };
