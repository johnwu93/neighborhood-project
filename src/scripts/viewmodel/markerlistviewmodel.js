/**
 *
 * @param {Array<MarkerView>} markers
 */
const showMarkers = function showMarkers(markers) {
  markers.forEach(marker => marker.show());
};

/**
 *
 * @param {Array<MarkerView>} markers
 */
const closeMarkers = function closeMarkers(markers) {
  markers.forEach(marker => marker.close());
};


class MarkerListViewModel {
  /**
   * @description Given a list of markers, it will display them reactively
   * @param {Array<MarkerView>} allMarkersList
   * @param {KnockoutObservableArray<MarkerView>} visibleMarkers,
   */
  constructor(allMarkersList, visibleMarkers) {
    this.allMarkersList = allMarkersList;
    this.visibleMarkers = visibleMarkers;
  }

  setup() {
    this.visibleMarkers.subscribe(this.show.bind(this));
    this.show(this.visibleMarkers());
  }

  show(markers) {
    closeMarkers(this.allMarkersList);
    showMarkers(markers);
  }
}


export { showMarkers, closeMarkers, MarkerListViewModel };
