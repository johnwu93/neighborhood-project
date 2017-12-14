// @flow
// $FlowFixMe
import branch from 'promise-branch';

import BusinessSearchQuery from '../entities/businesssearchquery';
import { computeUrlQuery, retrieveJsonData } from './util';

import type { GPSCoordinates, Venue } from './foursquare/businessinfoscraper';
import BusinessInfoScraper from './foursquare/businessinfoscraper';
import Review from '../entities/review';
import { retrieveReview } from './foursquare/businessretrieverpromises';
import type { WrappedTips } from './foursquare/retrievermethods';
import { getReview } from './foursquare/retrievermethods';

type ScrapedBusinessInfo = {
  rating: ?number,
  address: ?string,
  coords: ?GPSCoordinates,
}

type ScrapedResult = {
  rating: ?number,
  address: ?string,
  review: ?Review,
  coords: ?GPSCoordinates,
}


const getId = function getId(businessJsonData: { venues: Array<Venue> }): number {
  return businessJsonData.venues[0].id;
};

const fetchBusinessInfo =
  function fetchBusinessInfo(scraper: BusinessInfoScraper): Promise<ScrapedBusinessInfo> {
    return branch(scraper.retrieveResponse(),
      () => Promise
        .all([scraper.fetchRating(), scraper.fetchAddress(), scraper.fetchCoordinates()])
        .then(([rating, address, coords]) => ({rating, address, coords})),
      () => ({rating: null, address: null, coords: null}),
    );
  };

const fetchReview =
  function fetchReview(scraper: Promise<WrappedTips>): Promise<{ review: Review }> {
    return branch(scraper,
      () => scraper.then(getReview),
      () => ({
        review: null,
      }),
    );
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

  fetch(): Promise<ScrapedResult> {
    return this.promise
      .then((businessId) => {
        const fetchedBusinessInfo = fetchBusinessInfo(new BusinessInfoScraper(businessId));
        const fetchedReviewInfo = fetchReview(retrieveReview(businessId));

        // $FlowFixMe
        return Promise.all([fetchedBusinessInfo, fetchedReviewInfo])
          .then(([businessInfo, reviewInfo]) => (
            {...businessInfo, review: reviewInfo}
          ));
      });
  }
}
