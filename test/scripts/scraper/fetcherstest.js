/* eslint-disable no-undef */
import { assertResolvedPromise } from '../../assertutil';
import { fetchData } from '../../../src/scripts/scraper/fetchers';
import { retrieveReview } from '../../../src/scripts/scraper/foursquare/businessretrieverpromises';
import { assertReview, MARU_COFFEE_ID } from '../../maru';
import { getReview } from '../../../src/scripts/scraper/foursquare/retrievermethods';

describe('fetchers', () => {
  it('should return null if it fails to fetch data', (done) => {
    const rejectedPromise = Promise.reject('Could not retrieve input data');
    const fetchedPromiseResult = fetchData(rejectedPromise);
    assertResolvedPromise(fetchedPromiseResult, done, (result) => {
      expect(result).toBeNull();
    });
  });

  it('should get a review of Maru Coffee', (done) => {
    const maruReviewPromise = fetchData(retrieveReview(MARU_COFFEE_ID), getReview);
    assertResolvedPromise(maruReviewPromise, done, result => assertReview(result));
  });
});
