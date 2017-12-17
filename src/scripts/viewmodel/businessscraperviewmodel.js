// @flow
import Business from '../entities/business';

/**
 * @description Interface for retrieving a list of businesses
 */
export interface BusinessScraperViewModel {
  fetch(): Promise<Array<Business>>;
}
