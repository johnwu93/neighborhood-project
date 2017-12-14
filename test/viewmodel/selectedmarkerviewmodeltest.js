import ko from 'knockout';

import SelectedMarkerViewModel from '../../src/scripts/viewmodel/selectedmarkerviewmodel';
import MarkerMock from '../view/markermock';

describe('SelectedMarkerViewModel', () => {
  it('should have marker bounce when marker changes', () => {
    const oldMarker = new MarkerMock();
    const markerObservable = ko.observable(oldMarker);
    const selectedMarkerViewModel = new SelectedMarkerViewModel(markerObservable);
    selectedMarkerViewModel.setup();

    const newMarker = new MarkerMock();
    markerObservable(newMarker);

    expect(newMarker.isBounced).toBeTrue();
  });
});
