import { assertResolvedPromise } from './assertutil';
import BusinessCollectionRetriever from '../src/scripts/scraper/businesscollectionretriever';
import BusinessSearchQuery from '../src/scripts/entities/businesssearchquery';

describe('DataFetcher', () => {
  it('should retrieve all businesses', (done) => {
    const hipsterBusinessesQueries = [
      'Maru Coffee',
      'Intelligentsia',
      'Mandrake Bar',
      'The Thirsty Crow',
      'Pho Cafe',
      'Harvard & Stone',
    ].map(businessName => new BusinessSearchQuery(businessName));

    const retriever = new BusinessCollectionRetriever(hipsterBusinessesQueries);
    assertResolvedPromise(retriever.fetch(), done, (businesses) => {
      expect(businesses.length).toEqual(hipsterBusinessesQueries.length);
    });
  });
});

