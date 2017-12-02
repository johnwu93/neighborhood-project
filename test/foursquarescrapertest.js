import { retrieveJsonData } from '../src/scripts/scraper/util';
import { assertRejectedPromise, assertResolvedPromise } from './assertutil';
import Business from '../src/scripts/entities/business';
import getBusinessId from '../src/scripts/scraper/foursquarescraper';
import MARU_COFFEE_ID from './maru';

describe('Four Square Scraper', () => {
  it('should be fail to to retrieve json data if request was unsuccessful', (done) => {
    assertRejectedPromise(retrieveJsonData(Promise.resolve({status: 404})), done);
  });

  it('should have trouble connecting to retrieving data if nothing is inputted', (done) => {
    const business = new Business('abcd Fake Street', 'Fake Street');
    const promise = getBusinessId(business);
    assertRejectedPromise(promise, done);
  });

  it('should successfully find an awesome coffee shop :)', (done) => {
    const business = new Business('Maru Coffee', 'Los Angeles, CA');

    assertResolvedPromise(getBusinessId(business), done,
      (actualId) => {
        expect(actualId).toEqual(MARU_COFFEE_ID);
      });
  });
});
