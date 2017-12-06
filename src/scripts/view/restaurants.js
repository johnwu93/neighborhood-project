// @flow

import businessFactory from '../entities/businessfactory';
import Business from '../entities/business';

const THE_THIRSTY_CROW = 'The Thirsty Crow';
const createRestaurants = function createRestaurants(): Array<Business> {
  const restaurants = [{
    name: 'Fred 62',
    rating: 8.5,
    address: '1850 N Vermont Ave, Los Angeles CA, 90027',
    coords: {
      lat: 34.10462202421534,
      lng: -118.2916394863315,
    },
    review: {
      text: 'heir menu has had a facelift recently, but you can still get items like the New Amsterdam breakfast sandwich and California omelette. And for the vegetarians, there are plenty of options',
      url: 'https://foursquare.com/item/53dbf3c3498ece72b04d3eab',
    },
  }, {
    name: 'Harvard & Stone',
    rating: 8.4,
    address: '5221 Hollywood Blvd, Los Angeles CA, 90027',
    coords: {
      lat: 34.10194839792245,
      lng: -118.30431307299536,
    },
    review: {
      text: 'Head to the back ‘R&D’ bar first - there you’ll find a monthly featured spirit and a drinks menu that changes almost daily. You could come here every night for a month and have a new drink every time!',
      url: 'https://foursquare.com/item/4fe8e15ae4b0e28f6619ae58',
    },
  }, {
    name: THE_THIRSTY_CROW,
    rating: 8.6,
    address: '2939 W Sunset Blvd, Los Angeles CA, 90026',
    coords: {
      lat: 34.0836643354137,
      lng: -118.2737970961865,
    },
    review: {
      text: 'This bar is one of my favorites! Nothing compares to their signature cocktail The Thirsty Crow! Plus they play great music! Also a pretty bomb sazerac if your into that kind of thing...  mixology',
      url: 'https://foursquare.com/item/514bdf15e4b0625861892ae5',
    },
  }];

  return restaurants.map(businessFactory);
};

export { createRestaurants, THE_THIRSTY_CROW };

