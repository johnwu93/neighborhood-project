import PhotoScraper from '../../../../src/scripts/scraper/foursquare/photoscraper';
import { assertPhoto, MARU_COFFEE_ID } from '../../../maru';
import { assertResolvedPromise } from '../../../assertutil';

describe('PhotoScraper', () => {
  describe('Scraping Maru Coffee', () => {
    beforeEach(function setup(done) {
      this.photoScraper = new PhotoScraper(MARU_COFFEE_ID);
      this.photoScraper.retrieveResponse();
      done();
    });

    it('should successfully obtain a photo of a shop', function testPhoto(done) {
      assertResolvedPromise(this.photoScraper.fetch(), done, assertPhoto);
    });
  });

  describe('Fake shop', () => {
    beforeEach(function setUpBusinessWithNoPhotos() {
      this.photoScraper = new PhotoScraper(0);
      this.photoScraper.jsonPromise = Promise.resolve({
        photos: {
          items: [],
        },
      });
    });

    it('should return null if a business has no photos', function testNull(done) {
      assertResolvedPromise(this.photoScraper.fetch(), done, (photos) => {
        expect(photos).toBe(null);
      });
    });
  });
});
