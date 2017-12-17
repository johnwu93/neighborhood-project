// @flow
// $FlowFixMe
import Materialize from 'materialize-css/dist/js/materialize';
import { retrieveBusinessComponents, retrieveBusinessId } from '../scraper/foursquarescraper';
import BusinessSearchQuery from '../entities/businesssearchquery';
import Business from '../entities/business';
import type { BusinessScraperViewModel } from './businessscraperviewmodel';

async function retrieveInformation(
  businessQuery: BusinessSearchQuery,
  retrievedBusinesses: Array<Business>,
) {
  try {
    const businessId = await retrieveBusinessId(businessQuery);
    const scrapedBusinessResult = await retrieveBusinessComponents(businessId);
    const {rating, address, review, coords, photo} = scrapedBusinessResult;
    const business = new Business(businessQuery.name, rating, address, review, coords, photo);
    retrievedBusinesses.push(business);
  } catch (e) {
    console.log(e);
  }
}

/**
 * @description Retrieves business data from four square and is fed to other web components.
 * If it could not retrieve any businesses, a toast will be displayed.
 */
export default class FourSquareScraperViewModel implements BusinessScraperViewModel {
  businessQueries: [BusinessSearchQuery];

  constructor(businessQueries: [BusinessSearchQuery]) {
    this.businessQueries = businessQueries;
  }

  async fetch(): Promise<Array<Business>> {
    const retrievedBusinesses = [];
    const scrapers = this.businessQueries.map(query =>
      retrieveInformation(query, retrievedBusinesses),
    );
    await Promise.all(scrapers);
    if (retrievedBusinesses.length === 0) {
      Materialize.toast('Could not fetch business data. Please check your internet connection', 4000);
    }
    return retrievedBusinesses;
  }
}

