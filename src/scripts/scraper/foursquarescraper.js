// @flow

import BusinessSearchQuery from '../entities/businesssearchquery';
import { computeUrlQuery, retrieveJsonData } from './util';
import GPSCoordinates from '../entities/gpscoordinates';
import Review from '../entities/review';
import {
  retrieveBusinessInfo,
  retrievePhoto,
  retrieveReview,
} from './foursquare/businessretrieverpromises';
import type { Venue } from './foursquare/retrievermethods';
import { getPhoto, getReview } from './foursquare/retrievermethods';
import { fetchBusinessInfo, fetchData } from './fetchers';

type ScrapedResult = {
  rating: ?number,
  address: ?string,
  review: ?Review,
  coords: ?GPSCoordinates,
  photo: ?string,
}

const getId = function getId(businessJsonData: { venues: Array<Venue> }): number {
  return businessJsonData.venues[0].id;
};

/**
 * @description Retrieves the ID of a business based on it's name
 * @param business
 * @return {Promise<number>}
 */
async function retrieveBusinessId(business: BusinessSearchQuery): Promise<number> {
  const {city, name} = business;
  const searchBusinessIdParams = {
    near: city,
    query: name,
  };

  const urlBusinessIdQuery = computeUrlQuery(
    'https://api.foursquare.com/v2/venues/search',
    searchBusinessIdParams,
  );
  try {
    const businessQueryResult = await retrieveJsonData(fetch(urlBusinessIdQuery));
    return getId(businessQueryResult);
  } catch (e) {
    throw Error(`Was not able to retrieve business ${name}`);
  }
}

/**
 * @description retrieves information of a business based on it's id. This information is used for
 * web components
 * @param businessId
 * @return {Promise<number>}
 */
async function retrieveBusinessComponents(businessId: number): Promise<ScrapedResult> {
  const businessInfo = await fetchBusinessInfo(retrieveBusinessInfo(businessId));
  const reviewInfo = await fetchData(retrieveReview(businessId), getReview);
  const photoInfo = await fetchData(retrievePhoto(businessId), getPhoto);

  return {
    ...businessInfo,
    review: reviewInfo,
    photo: photoInfo,
  };
}

export { retrieveBusinessId, retrieveBusinessComponents };
