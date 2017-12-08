import ko from 'knockout';

import MarkerMock from '../view/markermock';
import {
  closeMarkers,
  MarkerListViewModel,
  showMarkers,
} from '../../src/scripts/viewmodel/markerlistviewmodel';

const assertAllMarkersAreInvisible = function assertAllMarkersAreInvisible(markers) {
  expect(markers.every(({isVisible}) => !isVisible)).toBeTrue();
};

const assertMarkerVisibility = function assertMarkerVisibility(markers, expectedVisibilities) {
  expect(markers.map(({isVisible}) => isVisible)).toEqual(expectedVisibilities);
};

describe('MarkerListViewModel', () => {
  describe('show and close', () => {
    beforeEach(function setup() {
      this.markers = [0, 1].map(() => new MarkerMock());
      showMarkers(this.markers);
    });

    it('should show all markers', function testShow() {
      expect(this.markers.every(({isVisible}) => isVisible)).toBeTrue();
    });

    it('should close all markers', function testClose() {
      closeMarkers(this.markers);
      assertAllMarkersAreInvisible(this.markers);
    });
  });

  describe('Some markers are visible if the VisibleMarkerArray changes', () => {
    beforeEach(function setup() {
      this.markers = [0, 1].map(() => new MarkerMock());
      showMarkers(this.markers);
      /**
       *
       * @param {KnockoutObservableArray<MarkerMock>} observableVisibleMarkers
       * @return {MarkerListViewModel}
       */
      this.createMarkerListViewModel = function createMarkerListViewModel(
        observableVisibleMarkers,
      ) {
        const markerListViewModel = new MarkerListViewModel(this.markers, observableVisibleMarkers);
        markerListViewModel.setup();
      };
    });

    describe('when MarkerListViewModel is initially setup', () => {
      beforeEach(function setup() {
        this.createObservableMarkerListViewModel =
          function createObservableMarkerListViewModel(visibleMarkers) {
            this.createMarkerListViewModel(ko.observableArray(visibleMarkers));
          };
      });

      it('should have all markers invisible if VisibleMarkerArray is empty', function testAllInvisible() {
        this.createObservableMarkerListViewModel([]);
        assertAllMarkersAreInvisible(this.markers);
      });

      it('should have markers visible to the same markers in VisibleMarkerArray', function testCorrespondingVisilbility() {
        this.createObservableMarkerListViewModel([this.markers[0]]);
        assertMarkerVisibility(this.markers, [true, false]);
      });
    });


    describe('when visibleMarkerArray changes', () => {
      it('should have no markers be visible if visibleMarkerArray becomes empty', function testNoVisible() {
        const observableVisibleArray = ko.observableArray([...this.markers]);
        this.createMarkerListViewModel(observableVisibleArray);
        observableVisibleArray([]);
        assertAllMarkersAreInvisible(this.markers);
      });

      it('should have no markers be visible if visibleMarkerArray changes values into a nonempty array', function testChangeVisible() {
        const observableVisibleArray = ko.observableArray([...this.markers]);
        this.createMarkerListViewModel(observableVisibleArray);
        observableVisibleArray([this.markers[0]]);
        assertMarkerVisibility(this.markers, [true, false]);
      });
    });
  });
});
