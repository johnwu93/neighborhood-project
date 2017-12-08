import ko from 'knockout';

import MarkerViewModel from '../../src/scripts/viewmodel/markerviewmodel';
import MarkerMock from '../view/markermock';

describe('MarkerViewModel', () => {
  it('should change business ids when isVisible is clicked', () => {
    const selectedBusinessId = ko.observable(0);
    const marker = new MarkerMock();
    const expectedBusinessId = 1;
    const markerViewModel = new MarkerViewModel(selectedBusinessId, expectedBusinessId, marker);

    markerViewModel.setBindings();
    marker.triggerClick();

    expect(selectedBusinessId()).toBe(expectedBusinessId);
  });
});
