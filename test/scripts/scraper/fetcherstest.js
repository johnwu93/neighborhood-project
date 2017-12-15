/* eslint-disable no-undef */
import { assertResolvedPromise } from '../../assertutil';
import { fetchBusinessInfo, fetchData } from '../../../src/scripts/scraper/fetchers';
import {
  retrieveBusinessInfo,
  retrieveReview,
} from '../../../src/scripts/scraper/foursquare/businessretrieverpromises';
import {
  assertAddress,
  assertCoordinates,
  assertRating,
  assertReview,
  MARU_COFFEE_ID,
} from '../../maru';
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

  it('should get information about Maru Coffee', (done) => {
    const promise = fetchBusinessInfo(retrieveBusinessInfo(MARU_COFFEE_ID));
    assertResolvedPromise(promise, done, (scrapedInfo) => {
      const {coords, rating, address} = scrapedInfo;
      assertCoordinates(coords);
      assertRating(rating);
      assertAddress(address);
    });
  });

  it('should return null entries of a shop', (done) => {
    const promise = fetchBusinessInfo(retrieveBusinessInfo(0));
    assertResolvedPromise(promise, done, ({coords, rating, address}) => {
      expect(coords).toBeNull();
      expect(rating).toBeNull();
      expect(address).toBeNull();
    });
  });
});
