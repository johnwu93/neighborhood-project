// @flow

import Review from '../../entities/review';

type Photo = {
  prefix: string,
  suffix: string,
}


export type WrappedPhotos = {
  photos: {
    items: Array<Photo>,
  }
}

type Tip = {
  text: string,
  canonicalUrl: string,
}


export type WrappedTips = {
  tips: {
    items: Array<Tip>
  }
}

const unwrapPhotos = function unwrapPhotos(wrappedPhotos: WrappedPhotos): Array<Photo> {
  return wrappedPhotos.photos.items;
};

const convertToPhotoUrl = function convertToPhotoUrl(photo: Photo) {
  return photo.prefix + photo.suffix.substr(1);
};

const unwrapTips = function unwrapTips(jsonTips: WrappedTips): Array<Tip> {
  return jsonTips.tips.items;
};

const convertToReview = function convertToReview(tip: Tip): Review {
  return new Review(tip.text, tip.canonicalUrl);
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

export { getPhoto, getReview, getFirst };
