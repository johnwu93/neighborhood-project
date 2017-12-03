// @flow
// $FlowFixMe
import branch from 'promise-branch';

import Business from '../entities/business';
import { computeUrlQuery, retrieveJsonData } from './util';

import type { GPSCoordinates, Venue } from './foursquare/businessinfoscraper';
import BusinessInfoScraper from './foursquare/businessinfoscraper';
import ReviewScraper from './foursquare/reviewscraper';
import Review from '../entities/review';

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

const fetchReview = function fetchReview(scraper: ReviewScraper): Promise<{ review: Review }> {
  return branch(scraper.retrieveResponse(),
    () => scraper.fetch(),
    () => ({
      review: null,
    }),
  );
};

export default class FourSquareScraper {
  business: Business;
  promise: Promise<any>;

  constructor(business: Business) {
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
        const fetchedReviewInfo = fetchReview(new ReviewScraper(businessId));

        // $FlowFixMe
        return Promise.all([fetchedBusinessInfo, fetchedReviewInfo])
          .then(([businessInfo, reviewInfo]) => (
            {...businessInfo, review: reviewInfo}
          ));
      });
  }
}
