// @flow

import Business from '../entities/business';
import { computeUrlQuery, retrieveJsonData } from './util';

import type { Venue } from './foursquare/businessinfoscraper';

const getId = function getId(businessJsonData: { venues: Array<Venue> }): number {
  return businessJsonData.venues[0].id;
};

const getBusinessId = function getBusinessId(business: Business) {
  const searchBusinessIdParams = {
    near: business.city,
    query: business.name,
  };

  const urlBusinessIdQuery = computeUrlQuery(
    'https://api.foursquare.com/v2/venues/search',
    searchBusinessIdParams,
  );

  return retrieveJsonData(fetch(urlBusinessIdQuery))
    .then(getId)
    .catch(() => {
      throw Error(`Was not able to retrieve business ${business.name}`);
    });
};


export default getBusinessId;
