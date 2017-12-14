// @flow

import type { JSONParameterType } from '../util';
import { computeUrlQuery, retrieveJsonData } from '../util';
import type { WrappedPhotos, WrappedTips } from './retrievermethods';

function retrieveBusinessAttribute<RetrieveResultType>(
  businessId: number,
  attribute: string,
  reviewParameters: JSONParameterType = {},
): Promise<RetrieveResultType> {
  const query = computeUrlQuery(
    `https://api.foursquare.com/v2/venues/${businessId}/${attribute}`,
    reviewParameters,
  );
  return retrieveJsonData(fetch(query));
}

const retrievePhoto = function retrievePhoto(businessId: number): Promise<WrappedPhotos> {
  return retrieveBusinessAttribute(businessId, 'photos');
};

const retrieveReview = function retrieveReview(businessId: number): Promise<WrappedTips> {
  const reviewParameters = {
    sort: 'popular',
    limit: 1,
  };
  return retrieveBusinessAttribute(businessId, 'tips', reviewParameters);
};


export { retrievePhoto, retrieveReview, retrieveBusinessAttribute };
