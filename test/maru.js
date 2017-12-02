const MARU_COFFEE_ID = '57e822ed498e715ce7609025';

const assertAddress = function assertAddress(scrapedAddress) {
  expect(scrapedAddress).toEqual('1936 Hillhurst Ave, Los Angeles CA, 90027');
};

const assertRating = function assertRating(scrapedRating) {
  const expectedRating = 8.0;
  expect(scrapedRating).toBeGreaterThan(expectedRating,
    `Coffee shop should have a rating more than ${expectedRating}`,
  );
};

const assertReview = function assertReview(scrapedReview) {
  expect(scrapedReview.text).toBeNonEmptyString();
  expect(scrapedReview.url).toBeNonEmptyString();
};

export { MARU_COFFEE_ID, assertAddress, assertRating, assertReview };
