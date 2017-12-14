import ko from 'knockout';

import SelectedMarkerViewModel from '../../src/scripts/viewmodel/selectedmarkerviewmodel';
import MarkerMock from '../view/markermock';

describe('SelectedMarkerViewModel', () => {
  beforeEach(function setup() {
    const oldMarker = new MarkerMock();
    this.markerObservable = ko.observable(oldMarker);
    const selectedMarkerViewModel = new SelectedMarkerViewModel(this.markerObservable);
    selectedMarkerViewModel.setup();
  });

  it('should have marker bounce when marker changes', function testBounce() {
    const newMarker = new MarkerMock();
    this.markerObservable(newMarker);

    expect(newMarker.isBounced).toBeTrue();
  });

  it('should have map zoomed to the marker when marker changes', function testZoom() {
    const newMarker = new MarkerMock();
    this.markerObservable(newMarker);

    expect(newMarker.isFocused).toBeTrue();
  });
});
