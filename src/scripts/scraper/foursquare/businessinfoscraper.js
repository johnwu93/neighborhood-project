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

type WrappedVenue = {
  venue: Venue,
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
    const promise: Promise<WrappedVenue> = retrieveJsonData(fetch(query));
    this.jsonPromise = promise
      .then(({venue}) => venue);
    return this.jsonPromise;
  }

  fetchRating(): Promise<number> {
    return this.jsonPromise.then(({rating}) => rating);
  }

  fetchAddress(): Promise<string> {
    return this.jsonPromise
      .then(({location}) => {
        const {address, city, state, postalCode} = location;
        return `${address}, ${city} ${state}, ${postalCode}`;
      });
  }
}

export type { Venue };
