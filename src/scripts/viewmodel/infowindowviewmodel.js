export default class InfoWindowViewModel {
  /**
   *
   * @param {InfoWindowView}infoWindowView
   * @param {KnockoutObservable<BusinessMarker>}currentBusinessMarker
   */
  constructor(infoWindowView, currentBusinessMarker) {
    // registers event for InfoWindow
    this.infoMarkerView = infoWindowView;
    this.currentBusinessMarker = currentBusinessMarker;
    currentBusinessMarker.subscribe(this.update.bind(this));
    infoWindowView.onClose(this.deselectBusinessMarker.bind(this));
  }

  /**
   *
   * @param {BusinessMarker} targetedBusinessMarker
   */
  update(targetedBusinessMarker) {
    this.infoMarkerView.display(targetedBusinessMarker);
  }

  deselectBusinessMarker() {
    this.currentBusinessMarker(null);
  }
}
