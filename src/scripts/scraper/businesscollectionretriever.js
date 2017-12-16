// @flow
import { retrieveBusinessComponents, retrieveBusinessId } from './foursquarescraper';
import BusinessSearchQuery from '../entities/businesssearchquery';
import Business from '../entities/business';

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
    console.log(`Could not obtain ${businessQuery.name}`);
  }
}


export default class BusinessCollectionRetriever {
  businessQueries: [BusinessSearchQuery];

  constructor(businessQueries: [BusinessSearchQuery]) {
    this.businessQueries = businessQueries;
  }

  async fetch() {
    const retrievedBusinesses = [];
    const scrapers = this.businessQueries.map(query =>
      retrieveInformation(query, retrievedBusinesses),
    );
    await Promise.all(scrapers);
    return retrievedBusinesses;
  }
}

