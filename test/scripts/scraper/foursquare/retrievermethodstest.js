import { assertRejectedPromise, assertResolvedPromise } from '../../../assertutil';
import { assertPhoto, assertReview, MARU_COFFEE_ID } from '../../../maru';
import {
  retrieveBusinessAttribute,
  retrievePhoto,
  retrieveReview,
} from '../../../../src/scripts/scraper/foursquare/businessretrieverpromises';
import {
  getFirst,
  getPhoto,
  getReview,
} from '../../../../src/scripts/scraper/foursquare/retrievermethods';

describe('retrievermethods', () => {
  it('should fail in obtaining the attribute of a nonexisting shop', (done) => {
    const invalidBusinessId = 0;
    assertRejectedPromise(retrieveReview(invalidBusinessId), done);
  });

  it('should fail in obtaining a nonexisting attribute of a shop', (done) => {
    const businessRetrieverPromise = retrieveBusinessAttribute(MARU_COFFEE_ID, 'foo');
    assertRejectedPromise(businessRetrieverPromise, done);
  });

  it('should return none if it retrieves an empty collection of an attribute', () => {
    const firstElement = getFirst([], () => {
      throw Error;
    });

    expect(firstElement).toBeNull();
  });

  it('should successfully obtain a review of a shop', (done) => {
    assertResolvedPromise(retrieveReview(MARU_COFFEE_ID).then(getReview), done, assertReview);
  });

  it('should successfully obtain a photo of a shop', (done) => {
    const photoRetrieverPromise = retrievePhoto(MARU_COFFEE_ID);
    assertResolvedPromise(photoRetrieverPromise.then(getPhoto), done, assertPhoto);
  });
});
