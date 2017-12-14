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
      this.photoScraper = new ReviewScraper(MARU_COFFEE_ID);
      this.photoScraper.retrieveResponse();
      done();
    });

    it('should successfully obtain a review of a shop', function testReview(done) {
      assertResolvedPromise(this.photoScraper.fetch(), done, assertReview);
    });
  });

  describe('Fake shop', () => {
    beforeAll(function setUpBusinessWithNoComments() {
      this.photoScraper = new ReviewScraper(0);
      this.photoScraper.promise = Promise.resolve({
        tips: {
          items: [],
        },
      });
    });

    it('should return null if a business has no reviews', function testNull(done) {
      assertResolvedPromise(this.photoScraper.fetch(), done, (review) => {
        expect(review).toBe(null);
      });
    });
  });
});
