// @flow
// $FlowFixMe

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
import { getPhoto, getReview} from './foursquare/retrievermethods';
import {fetchData, fetchBusinessInfo} from './fetchers';

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

export default class FourSquareScraper {
  business: BusinessSearchQuery;
  promise: Promise<any>;

  constructor(business: BusinessSearchQuery) {
    this.business = business;
  }

  retrieveResponse() {
    const {city, name} = this.business;
    const searchBusinessIdParams = {
      near: city,
      query: name,
    };

    const urlBusinessIdQuery = computeUrlQuery(
      'https://api.foursquare.com/v2/venues/search',
      searchBusinessIdParams,
    );

    this.promise = retrieveJsonData(fetch(urlBusinessIdQuery))
      .then(getId)
      .catch(() => {
        throw Error(`Was not able to retrieve business ${name}`);
      });

    return this.promise;
  }

  // eslint-disable-next-line
  retrieveBusiness(businessId: number) {
    return retrieveBusinessInfo(businessId);
  }

  fetch(): Promise<ScrapedResult> {
    return this.promise
      .then((businessId) => {
        const fetchedBusinessInfo = fetchBusinessInfo(this.retrieveBusiness(businessId));
        const fetchedReviewInfo = fetchData(retrieveReview(businessId), getReview);
        const fetchedPhotoInfo = fetchData(retrievePhoto(businessId), getPhoto);

        // $FlowFixMe
        return Promise.all([fetchedBusinessInfo, fetchedReviewInfo, fetchedPhotoInfo])
          .then(([businessInfo, reviewInfo, photoInfo]) => (
            {...businessInfo, review: reviewInfo, photo: photoInfo}
          ));
      });
  }
}
