import { retrieveJsonData } from '../src/scripts/scraper/util';
import { assertRejectedPromise, assertResolvedPromise } from './assertutil';
import Business from '../src/scripts/entities/business';
import FourSquareScraper from '../src/scripts/scraper/foursquarescraper';
import { assertAddress, assertRating, assertReview, MARU_COFFEE_ID } from './maru';
import * as businessinfoscrapermodule from '../src/scripts/scraper/foursquare/businessinfoscraper';

describe('Four Square Scraper', () => {
  it('should be fail to to retrieve json data if request was unsuccessful', (done) => {
    assertRejectedPromise(retrieveJsonData(Promise.resolve({status: 404})), done);
  });

  it('should have trouble connecting to retrieving data if nothing is inputted', (done) => {
    const business = new Business('abcd Fake Street', 'Fake Street');
    const scraper = new FourSquareScraper(business);
    assertRejectedPromise(scraper.retrieveResponse(), done);
  });

  describe('Scraping Maru Coffee', () => {
    beforeAll(function setupMaruCoffeeScraper() {
      this.business = new Business('Maru Coffee', 'Los Angeles, CA');
      this.scraper = new FourSquareScraper(this.business);
      this.scraper.retrieveResponse();
    });

    it('should retrieve response successfully', function testRetrievingResponse(done) {
      assertResolvedPromise(this.scraper.promise, done, (scrapedInfo) => {
        expect(scrapedInfo).toEqual(MARU_COFFEE_ID);
      });
    });

    it('should scrape successfully', function testFetch(done) {
      assertResolvedPromise(this.scraper.fetch(), done, (scrapedInfo) => {
        assertRating(scrapedInfo.rating);
        assertAddress(scrapedInfo.address);
        assertReview(scrapedInfo.review);
      });
    });

    it('should treat rating and text as null if it is unable to retrieve these items', function testUnsuccessfulFetchComponents(done) {
      // hack: This would mock BusinessInfoScraper
      spyOn(businessinfoscrapermodule.default.prototype, 'retrieveResponse').and.returnValue(Promise.reject('Could not retrieve data of business'));
      assertResolvedPromise(this.scraper.fetch(), done, (scrapedInfo) => {
        expect(scrapedInfo.rating).toBeNull();
        expect(scrapedInfo.address).toBeNull();
        assertReview(scrapedInfo.review);
      });
    });
  });
});
