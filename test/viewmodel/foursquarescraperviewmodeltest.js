import { assertResolvedPromise } from '../assertutil';
import BusinessSearchQuery from '../../src/scripts/entities/businesssearchquery';
import FourSquareScraperViewModel from '../../src/scripts/viewmodel/foursquarescraperviewmodel';

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

    const retriever = new FourSquareScraperViewModel(hipsterBusinessesQueries);
    assertResolvedPromise(retriever.fetch(), done, (businesses) => {
      expect(businesses.length).toEqual(hipsterBusinessesQueries.length);
    });
  });
});

