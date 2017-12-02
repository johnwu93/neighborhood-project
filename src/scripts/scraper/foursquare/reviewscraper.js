// @flow

import { computeUrlQuery, retrieveJsonData } from '../util';
import Review from '../../entities/review';

export default class ReviewScraper {
  businessId: number;
  promise: Promise<any>;

  constructor(businessId: number) {
    this.businessId = businessId;
  }

  retrieveResponse() {
    const reviewParameters = {
      sort: 'popular',
      limit: 1,
    };

    const query = computeUrlQuery(
      `https://api.foursquare.com/v2/venues/${this.businessId}/tips`,
      reviewParameters,
    );
    this.promise = retrieveJsonData(fetch(query));
    return this.promise;
  }

  fetch(): Promise<null | Review> {
    return this.promise
      .then(({tips}) => tips.items)
      .then(
        items => (items.length === 0 ? Promise.reject('No reviews could be found') : items[0]),
        () => null,
      )
      .then(tip => (tip === null ? null : new Review(tip.text, tip.canonicalUrl)));
  }
}
