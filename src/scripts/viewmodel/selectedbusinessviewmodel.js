import ko from 'knockout';

export default class SelectedBusinessViewModel {
  /**
   * @param {Array<BusinessMarker>}businessMarkers
   */
  constructor(businessMarkers) {
    const self = this;
    self.observableId = ko.observable(null);
    self.businessMarkers = businessMarkers;
    self.observableBusinessMarker = ko.computed({
      read() {
        const id = self.observableId();
        return id === null ? null : businessMarkers[id];
      },
      write(newBusinessMarker) {
        self.changeId(newBusinessMarker);
      },
    });
  }

  setup() {
    this.observableBusinessMarker.subscribe(this.changeId.bind(this));
  }

  /**
   *
   * @param {BusinessMarker}businessMarker
   */
  changeId(businessMarker) {
    const newId = businessMarker === null ? null : businessMarker.id;
    this.observableId(newId);
  }
}
