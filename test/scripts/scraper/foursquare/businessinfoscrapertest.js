import { assertResolvedPromise } from '../../../assertutil';
import { assertAddress, assertCoordinates, assertRating, MARU_COFFEE_ID } from '../../../maru';
import { retrieveBusinessInfo } from '../../../../src/scripts/scraper/foursquare/businessretrieverpromises';
import {
  getAddress,
  getCoordinates,
  getRating,
} from '../../../../src/scripts/scraper/foursquare/retrievermethods';

describe('Business Info Scraper', () => {
  describe('Retrieving Maru Coffee', () => {
    beforeAll(function setup() {
      this.businessInfoPromise = retrieveBusinessInfo(MARU_COFFEE_ID);
    });

    it('should successfully obtain a rating of the shop', function testRating(done) {
      assertResolvedPromise(this.businessInfoPromise.then(getRating), done, assertRating);
    });

    it('should successfully obtain the address of a shop', function testAddress(done) {
      assertResolvedPromise(this.businessInfoPromise.then(getAddress), done, assertAddress);
    });

    it('should successfully obtain the lat/lng of a shop', function testGPSCoordinates(done) {
      assertResolvedPromise(this.businessInfoPromise.then(getCoordinates), done, assertCoordinates);
    });
  });
});
