import { assertRejectedPromise, assertResolvedPromise } from '../../../assertutil';
import ReviewScraper from '../../../../src/scripts/scraper/foursquare/reviewscraper';
import { assertReview, MARU_COFFEE_ID } from '../../../maru';

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
      assertResolvedPromise(this.businessScraper.fetch(), done, assertReview);
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
      assertResolvedPromise(this.businessScraper.fetch(), done, (review) => {
        expect(review).toBe(null);
      });
    });
  });
});
