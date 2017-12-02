import { assertRejectedPromise, assertResolvedPromise } from '../../../assertutil';
import MARU_COFFEE_ID from '../../../maru';
import ReviewScraper from '../../../../src/scripts/scraper/foursquare/reviewscraper';

describe('Review Scraper', () => {
  describe('Nonexisting shop', () => {
    it('should fail in obtaining the tip of a nonexisting shop', (done) => {
      const reviewScraper = new ReviewScraper(0);
      assertRejectedPromise(reviewScraper.retrieveResponse(), done);
    });
  });

  describe('Scraping Maru Coffee', () => {
    beforeAll(function setup(done) {
      this.businessScraper = new ReviewScraper(MARU_COFFEE_ID);
      this.businessScraper.retrieveResponse();
      done();
    });

    it('should successfully obtain a review of a shop', function testReview(done) {
      assertResolvedPromise(this.businessScraper.fetch(), done, (scrapedReview) => {
        expect(scrapedReview.text).toBeNonEmptyString();
        expect(scrapedReview.url).toBeNonEmptyString();
      });
    });
  });

  describe('Fake shop', () => {
    beforeAll(function setUpBusinessWithNoComments() {
      this.businessScraper = new ReviewScraper(0);
      this.businessScraper.promise = Promise.resolve({
        tips: {
          items: [],
        },
      });
    });

    it('should return null if a business has no reviews', function testNull(done) {
      this.businessScraper.retrieveResponse();
      assertResolvedPromise(this.businessScraper.fetch(), done, (text) => {
        expect(text).toBe(null);
      });
    });
  });
});
