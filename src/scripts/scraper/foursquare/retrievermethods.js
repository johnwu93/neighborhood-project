// @flow

import Review from '../../entities/review';
import GPSCoordinates from '../../entities/gpscoordinates';


type Photo = {
  prefix: string,
  suffix: string,
}

/**
 * @description expected type when retrieving HTTP requests on photos of a business through the
 * FourSquare API
 */
export type WrappedPhotos = {
  photos: {
    items: Array<Photo>,
  }
}

type Tip = {
  text: string,
  canonicalUrl: string,
}

/**
 * @description expected type when retrieving HTTP requests on tips of a business through the
 * FourSquare API
 */
export type WrappedTips = {
  tips: {
    items: Array<Tip>
  }
}

type Location = {
  address: string,
  state: string,
  city: string,
  postalCode: number,
  lat: number,
  lng: number,
}

export type Venue = {
  id: number,
  rating: number,
  location: Location,
  photos: Array<string>,
}

/**
 * @description expected type when retrieving HTTP requests on venues of a business through the
 * FourSquare API
 */
export type WrappedVenue = {
  venue: Venue,
}

/**
 * @description methods that uses data from APIs and puts it in the form for other components to use
 */


const unwrapPhotos = function unwrapPhotos(wrappedPhotos: WrappedPhotos): Array<Photo> {
  return wrappedPhotos.photos.items;
};

const convertToPhotoUrl = function convertToPhotoUrl(photo: Photo) {
  return `${photo.prefix}300x300${photo.suffix}`;
};

const unwrapTips = function unwrapTips(jsonTips: WrappedTips): Array<Tip> {
  return jsonTips.tips.items;
};

const convertToReview = function convertToReview(tip: Tip): Review {
  return new Review(tip.text, tip.canonicalUrl);
};

const getRating = function getRating({venue}: WrappedVenue): number {
  const {rating} = venue;
  return rating;
};

const getAddress = function getAddress({venue}: WrappedVenue): string {
  const {location} = venue;
  const {address, city, state, postalCode} = location;
  return `${address}, ${city} ${state}, ${postalCode}`;
};

const getCoordinates = function getCoordinates({venue}: WrappedVenue) {
  const {location} = venue;
  const {lat, lng} = location;
  return new GPSCoordinates(lat, lng);
};

function getFirst<ValueT, ResultT>(
  values: Array<ValueT>,
  transformTask: (ValueT) => ResultT,
): ?ResultT {
  return values.length === 0 ? null : transformTask(values[0]);
}

const getPhoto = function getPhoto(wrappedPhotos: WrappedPhotos): ?string {
  const photos = unwrapPhotos(wrappedPhotos);
  return getFirst(photos, convertToPhotoUrl);
};

const getReview = function getReview(wrappedTips: WrappedTips): ?Review {
  const reviews = unwrapTips(wrappedTips);
  return getFirst(reviews, convertToReview);
};

export { getPhoto, getReview, getFirst, getRating, getAddress, getCoordinates };
