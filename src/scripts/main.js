import GoogleMapsLoader from 'google-maps';
import GoogleMapFactory from './view/googlemapfactory';
import NeighborhoodManager from './viewmodel/neighborhoodmanager';
import BusinessCollectionRetriever from './scraper/businesscollectionretriever';
import BusinessSearchQuery from './entities/businesssearchquery';

GoogleMapsLoader.KEY = 'AIzaSyCW6adgGSbXijMqJsDFWYDN5_2lfAjon1c';


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


  const retriever = new BusinessCollectionRetriever(hipsterBusinessesQueries);
  const neighborhoodManager = new NeighborhoodManager(retriever, googleMapFactory);
  // noinspection JSIgnoredPromiseFromCall
  neighborhoodManager.initialize();
});

