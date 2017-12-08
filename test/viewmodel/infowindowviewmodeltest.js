import ko from 'knockout';
import InfoWindowViewModel from '../../src/scripts/viewmodel/infowindowviewmodel';
import BusinessMarker from '../../src/scripts/viewmodel/businessmarker';
import MarkerMock from '../view/markermock';
import InfoWindowMock from '../view/infowindowmock';

const infoWriterMock = function infoWriterMock({name, review}) {
  return `name: ${name} review: ${review}`;
};

/**
 *
 * @param {InfoWindowMock} infoWindow
 * @param maruBusiness
 * @param {MarkerView}maruMarker
 */
const assertInfoWindow = function assertInfoWindow(infoWindow, maruBusiness, maruMarker) {
  expect(infoWindow.content).toBe(infoWriterMock(maruBusiness));
  expect(infoWindow.marker).toBe(maruMarker);
};

/**
 *
 * @property {InfoWindowMock} infoWindow
 */
describe('InfoWindowViewModel', () => {
  beforeEach(function setup() {
    this.maruBusiness = {name: 'Maru Coffee', review: 'This shop is great!'};
    this.maruMarker = new MarkerMock();
    this.maruBusinessMarker = new BusinessMarker(this.maruBusiness, this.maruMarker, 1);
    this.infoWindow = new InfoWindowMock();
    /**
     *
     * @param {BusinessMarker} currentBusinessMarker
     * @return {InfoWindowViewModel}
     */
    this.createInfoWindowViewModel = function createInfoWindowViewModel(currentBusinessMarker) {
      return new InfoWindowViewModel(
        this.infoWindow,
        ko.observable(currentBusinessMarker),
        infoWriterMock,
      );
    };
  });


  describe('update', () => {
    it('should change the content that the infoWindow selected if a business is not selected', function testUpdate() {
      const infoWindowViewModel = this.createInfoWindowViewModel(null);

      infoWindowViewModel.update(this.maruBusinessMarker);

      assertInfoWindow(this.infoWindow, this.maruBusiness, this.maruMarker);
    });

    it('should change the content that the marker is displaying when selecting another business', function testUpdate() {
      const starbucksBusiness = {name: 'Starbucks Coffee', review: 'This shop sucks'};
      const starbucksMarker = new MarkerMock();
      const starbucksBusinessMarker = new BusinessMarker(starbucksBusiness, starbucksMarker, 2);
      const infoWindowViewModel = this.createInfoWindowViewModel(starbucksBusinessMarker);

      infoWindowViewModel.update(this.maruBusinessMarker);

      assertInfoWindow(this.infoWindow, this.maruBusiness, this.maruMarker);
    });

    it('should not display a infoWindow when a business is deselected', function testUpdate() {
      const infoWindowViewModel = this.createInfoWindowViewModel(this.maruBusinessMarker);

      infoWindowViewModel.update(null);
      expect(this.infoWindow.marker).toBeNull();
    });
  });

  describe('selected new business event', () => {
    beforeAll(function setup() {
      this.assertChangeBusinessUpdate =
        function assertChangeBusinessUpdate(replacedBusiness, newlySelectedBusiness) {
          const infoWindowViewModel = this.createInfoWindowViewModel(replacedBusiness);
          spyOn(infoWindowViewModel, 'update');

          infoWindowViewModel.setup();
          infoWindowViewModel.selectedBusinessMarker(newlySelectedBusiness);

          expect(infoWindowViewModel.update).toHaveBeenCalledWith(newlySelectedBusiness);
        };
    });

    it('should call the method, update, when a business is being deselected', function testOnBusinessDeselect() {
      this.assertChangeBusinessUpdate(this.maruBusinessMarker, null);
    });

    it('should call the method, update, when a new business is selected', function testOnBusinessSelect() {
      this.assertChangeBusinessUpdate(null, this.maruBusinessMarker);
    });
  });

  describe('close info window event', () => {
    it('should have selectedBusinessMarker to be null if info window is closed', function testOnClose() {
      const infoWindowViewModel = this.createInfoWindowViewModel(this.maruBusinessMarker);
      infoWindowViewModel.setup();

      this.infoWindow.triggerClose();
      expect(infoWindowViewModel.selectedBusinessMarker()).toBeNull();
    });
  });
});
