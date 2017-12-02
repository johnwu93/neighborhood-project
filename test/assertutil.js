const assertRejectedPromise = function assertRejectedPromise(promise, done) {
  promise.then(() => {
    done.fail(new Error('Search should have failed'));
  }, () => {
    done();
  });
};


const assertResolvedPromise = function assertResolvedPromise(promise, done, fulfilledTask) {
  promise.then((value) => {
    fulfilledTask(value);
    done();
  }, () => {
    done.fail(new Error('Search should have succeeded'));
  });
};


export { assertRejectedPromise, assertResolvedPromise };
