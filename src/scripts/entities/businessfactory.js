// @flow
import Business from './business';
import Review from './review';
import GPSCoordinates from './gpscoordinates';

const businessFactory = function businessFactory(
  business: {
    name: string,
    rating: number,
    address: string,
    review: { text: string, url: string },
    coords: { lat: number, lng: number },
    photo: string
  },
) {
  return new Business(
    business.name,
    business.rating,
    business.address,
    new Review(business.review.text, business.review.url),
    new GPSCoordinates(business.coords.lat, business.coords.lng),
    business.photo,
  );
};

export default businessFactory;

