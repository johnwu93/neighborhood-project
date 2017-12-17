import generateInfoWindowTemplate from '../view/generateinfowindowtemplate';

/**
 * @description Displays an info window showing details of a currently selected business
 */
export default class InfoWindowViewModel {
  /**
   * @callback infoWindowWriterTask
   * @param Business
   * @return string
   */

  /**
   * @param {InfoWindowView}infoWindowView
   * @param {KnockoutObservable<BusinessMarker>}selectedBusinessMarker
   * @param {infoWindowWriterTask} infoWindowWriter
   */
  constructor(
    infoWindowView,
    selectedBusinessMarker,
    infoWindowWriter = generateInfoWindowTemplate,
  ) {
    this.infoWindowView = infoWindowView;
    this.selectedBusinessMarker = selectedBusinessMarker;
    this.infoWindowWriter = infoWindowWriter;
  }

  setup() {
    this.selectedBusinessMarker.subscribe(this.update.bind(this));
    this.selectedBusinessMarker.subscribe(this.closeInfoWindow.bind(this));
    this.infoWindowView.onClose(this.deselectBusinessMarker.bind(this));
  }

  /**
   *
   * @param {?BusinessMarker} targetedBusinessMarker
   */
  update(targetedBusinessMarker) {
    this.infoWindowView.close();
    if (targetedBusinessMarker) {
      const {marker, business} = targetedBusinessMarker;
      this.infoWindowView.display(marker, this.infoWindowWriter(business));
    }
  }

  deselectBusinessMarker() {
    this.selectedBusinessMarker(null);
  }

  closeInfoWindow(businessMarker) {
    if (businessMarker === null) {
      this.infoWindowView.close();
    }
  }
}
