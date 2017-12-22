import GoogleMapFactory from './view/googlemapfactory';
import NeighborhoodManager from './viewmodel/neighborhoodmanager';
import FourSquareScraperViewModel from './viewmodel/foursquarescraperviewmodel';
import BusinessSearchQuery from './entities/businesssearchquery';
import googleMapsLoaderFactory from './viewmodel/googlemapsloaderfactory';

const GoogleMapsLoader = googleMapsLoaderFactory();

/**
 * Setups App
 */
// noinspection JSUnresolvedFunction
GoogleMapsLoader.load((google) => {
  const googleMapFactory = new GoogleMapFactory(google);

  const hipsterBusinessesQueries = [
    'Maru Coffee',
    'Intelligentsia',
    'Mandrake Bar',
    'The Thirsty Crow',
    'Pho Cafe',
    'Harvard & Stone',
  ].map(businessName => new BusinessSearchQuery(businessName));


  const retriever = new FourSquareScraperViewModel(hipsterBusinessesQueries);
  const neighborhoodManager = new NeighborhoodManager(retriever, googleMapFactory);
  // noinspection JSIgnoredPromiseFromCall
  neighborhoodManager.initialize();
});

