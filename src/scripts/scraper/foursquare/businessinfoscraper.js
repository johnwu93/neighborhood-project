// @flow

import { computeUrlQuery, retrieveJsonData } from '../util';

type Location = {
  address: string,
  state: string,
  city: string,
  postalCode: number
}

type Venue = {
  id: number,
  rating: number,
  location: Location,
}

export default class BusinessInfoScraper {
  businessId: number;
  jsonPromise: Promise<Venue>; // todo use union rather than any

  constructor(businessId: number) {
    this.businessId = businessId;
  }

  retrieveResponse(): Promise<Venue> {
    const query = computeUrlQuery(
      `https://api.foursquare.com/v2/venues/${this.businessId}`,
    );
    this.jsonPromise = retrieveJsonData(fetch(query))
      .then(({venue}) => venue);
    return this.jsonPromise;
  }

  fetchRating(): Promise<number> {
    return this.jsonPromise.then(({rating}) => rating);
  }

  fetchAddress(): Promise<string> {
    return this.jsonPromise
      .then(({location}) => location)
      .then(({address, city, state, postalCode}) => `${address}, ${city} ${state}, ${postalCode}`);
  }
}

export type { Venue };
