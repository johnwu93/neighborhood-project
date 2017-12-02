import { assertRejectedPromise, assertResolvedPromise } from '../../../assertutil';
import BusinessInfoScraper from '../../../../src/scripts/scraper/foursquare/businessinfoscraper';
import MARU_COFFEE_ID from '../../../maru';

describe('Business Info Scraper', () => {
  describe('Nonexisting shop', () => {
    it('should fail in obtaining the rating of a nonexisting shop', (done) => {
      const businessScraper = new BusinessInfoScraper(0);
      assertRejectedPromise(businessScraper.retrieveResponse(), done);
    });
  });

  describe('Scraping Maru Coffee', () => {
    beforeAll(function setup(done) {
      this.businessScraper = new BusinessInfoScraper(MARU_COFFEE_ID);
      this.businessScraper.retrieveResponse();
      done();
    });

    it('should successfully obtain a rating of the shop', function testRating(done) {
      assertResolvedPromise(this.businessScraper.fetchRating(), done, (scrapedRating) => {
        const expectedRating = 8.0;
        expect(scrapedRating).toBeGreaterThan(expectedRating,
          `Coffee shop should have a rating more than ${expectedRating}`,
        );
      });
    });

    it('should successfully obtain the address of a shop', function testAddress(done) {
      assertResolvedPromise(this.businessScraper.fetchAddress(), done, (scrapedAddress) => {
        expect(scrapedAddress).toEqual('1936 Hillhurst Ave, Los Angeles CA, 90027');
      });
    });
  });
});
