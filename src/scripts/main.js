import GoogleMapsLoader from 'google-maps';
import GoogleMapFactory from './view/googlemapfactory';
import NeighborhoodManager from './viewmodel/neighborhoodmanager';
import MockScraperViewModel from './viewmodel/mockscraperviewmodel';

GoogleMapsLoader.KEY = 'AIzaSyCW6adgGSbXijMqJsDFWYDN5_2lfAjon1c';


// noinspection JSUnresolvedFunction
GoogleMapsLoader.load((google) => {
  const googleMapFactory = new GoogleMapFactory(google);

  const retriever = new MockScraperViewModel();
  const neighborhoodManager = new NeighborhoodManager(retriever, googleMapFactory);
  // noinspection JSIgnoredPromiseFromCall
  neighborhoodManager.initialize();
});

