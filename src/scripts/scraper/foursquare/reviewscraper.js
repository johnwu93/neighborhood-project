// @flow

import { computeUrlQuery, retrieveJsonData } from '../util';
import Review from '../../entities/review';

type Tip = {
  text: string,
  canonicalUrl: string,
}

type WrappedTips = {
  tips: {
    items: Array<Tip>
  }
}

const unwrapTips = function unwrapTips(jsonTips: WrappedTips): Array<Tip> {
  return jsonTips.tips.items;
};


const convertToReview = function convertToReview(tip: Tip): Review {
  return new Review(tip.text, tip.canonicalUrl);
};

export default class ReviewScraper {
  businessId: number;
  promise: Promise<WrappedTips>;

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

  fetch(): Promise<?Review> {
    return this.promise
      .then(unwrapTips)
      .then(
        items => (items.length === 0 ? null : convertToReview(items[0])),
      );
  }
}
