// @flow
import Business from '../entities/business';

export interface BusinessScraperViewModel {
  fetch(): Promise<Array<Business>>;
}
