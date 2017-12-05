import GoogleMapsLoader from 'google-maps';
import createRestaurants from './view/restaurants';
import GoogleMapFactory from './view/googlemapfactory';
import NeighborhoodManager from './viewmodel/neighborhoodmanager';

GoogleMapsLoader.KEY = 'AIzaSyCW6adgGSbXijMqJsDFWYDN5_2lfAjon1c';


// noinspection JSUnresolvedFunction
GoogleMapsLoader.load((google) => {
  const googleMapFactory = new GoogleMapFactory(google);
  const businesses = createRestaurants();

  const neighborhoodManager = new NeighborhoodManager(businesses, googleMapFactory);
  neighborhoodManager.setup();
});

