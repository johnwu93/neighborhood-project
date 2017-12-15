import { retrieveJsonData } from '../../../src/scripts/scraper/util';
import { assertRejectedPromise, assertResolvedPromise } from '../../assertutil';
import {
  retrieveBusinessComponents,
  retrieveBusinessId,
} from '../../../src/scripts/scraper/foursquarescraper';
import {
  assertAddress,
  assertCoordinates,
  assertPhoto,
  assertRating,
  assertReview,
  MARU_COFFEE_ID,
} from '../../maru';
import BusinessSearchQuery from '../../../src/scripts/entities/businesssearchquery';

describe('Four Square Scraper', () => {
  it('should be fail to to retrieve json data if request was unsuccessful', (done) => {
    assertRejectedPromise(retrieveJsonData(Promise.resolve({status: 404})), done);
  });

  it('should have trouble connecting to retrieving data if nothing is inputted', (done) => {
    const businessQuery = new BusinessSearchQuery('abcd Fake Street', 'Fake Street');
    assertRejectedPromise(retrieveBusinessId(businessQuery), done);
  });

  describe('Scraping Maru Coffee', () => {
    beforeAll(function setupMaruCoffeeScraper() {
      const businessQuery = new BusinessSearchQuery('Maru Coffee');
      this.businessIdPromise = retrieveBusinessId(businessQuery);
    });

    it('should retrieve response successfully', function testRetrievingResponse(done) {
      assertResolvedPromise(this.businessIdPromise, done, (scrapedInfo) => {
        expect(scrapedInfo).toEqual(MARU_COFFEE_ID);
      });
    });

    it('should scrape successfully', function testFetch(done) {
      this.businessIdPromise.then(retrieveBusinessComponents).then((scrapedInfo) => {
        const {coords, rating, address, review, photo} = scrapedInfo;
        assertCoordinates(coords);
        assertRating(rating);
        assertAddress(address);
        assertReview(review);
        assertPhoto(photo, done);
      });
    });
  });
});
