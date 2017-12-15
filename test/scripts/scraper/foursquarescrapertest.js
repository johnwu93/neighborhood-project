import { retrieveJsonData } from '../../../src/scripts/scraper/util';
import { assertRejectedPromise, assertResolvedPromise } from '../../assertutil';
import FourSquareScraper from '../../../src/scripts/scraper/foursquarescraper';
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
    const business = new BusinessSearchQuery('abcd Fake Street', 'Fake Street');
    const scraper = new FourSquareScraper(business);
    assertRejectedPromise(scraper.retrieveResponse(), done);
  });

  describe('Scraping Maru Coffee', () => {
    beforeAll(function setupMaruCoffeeScraper() {
      this.business = new BusinessSearchQuery('Maru Coffee');
      this.scraper = new FourSquareScraper(this.business);
      this.scraper.retrieveResponse();
    });

    it('should retrieve response successfully', function testRetrievingResponse(done) {
      assertResolvedPromise(this.scraper.promise, done, (scrapedInfo) => {
        expect(scrapedInfo).toEqual(MARU_COFFEE_ID);
      });
    });

    it('should scrape successfully', function testFetch(done) {
      this.scraper.fetch().then((scrapedInfo) => {
        assertCoordinates(scrapedInfo.coords);
        assertRating(scrapedInfo.rating);
        assertAddress(scrapedInfo.address);
        assertReview(scrapedInfo.review);
        assertPhoto(scrapedInfo.photo, done);
      });
    });

    it('should treat rating and text as null if it is unable to retrieve these items', function testUnsuccessfulFetchComponents(done) {
      spyOn(this.scraper, 'retrieveBusiness').and.returnValue(Promise.reject('Could not retrieve data of business'));
      this.scraper.fetch().then((scrapedInfo) => {
        expect(scrapedInfo.coords).toBeNull();
        expect(scrapedInfo.rating).toBeNull();
        expect(scrapedInfo.address).toBeNull();
        assertReview(scrapedInfo.review);
        assertPhoto(scrapedInfo.photo, done);
      });
    });
  });
});
