// @flow
import { computeUrlQuery, retrieveJsonData } from '../util';


type Photo = {
  prefix: string,
  suffix: string,
}

type WrappedPhotos = {
  photos: {
    items: Array<Photo>,
  }
}

const unwrapPhotos = function unwrapPhotos(wrappedPhotos: WrappedPhotos): Array<Photo> {
  return wrappedPhotos.photos.items;
};

export default class PhotoScraper {
  businessId: number;
  jsonPromise: Promise<WrappedPhotos>;

  constructor(businessId: number) {
    this.businessId = businessId;
  }

  retrieveResponse() {
    const query = computeUrlQuery(
      `https://api.foursquare.com/v2/venues/${this.businessId}/photos`,
    );
    this.jsonPromise = retrieveJsonData(fetch(query));
    return this.jsonPromise;
  }

  fetch(): Promise<?string> {
    return this.jsonPromise
      .then(unwrapPhotos)
      .then((photos) => {
        if (photos.length === 0) {
          return null;
        }
        const photo = photos[0];
        return photo.prefix + photo.suffix.substr(1);
      });
  }
}
