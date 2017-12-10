/**
 * @implements {InfoWindowView}
 */
export default class InfoWindowMock {
  constructor() {
    this.marker = null;
    this.content = null;
  }

  // IntelliJ bug: could not understand usage of methods from a subclass
  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {MarkerMock} marker
   * @param {string} content
   */
  display(marker, content) {
    this.marker = marker;
    this.content = content;
  }

  // IntelliJ bug: could not understand usage of methods from a subclass
  // noinspection JSUnusedGlobalSymbols
  close() {
    this.marker = null;
  }

  // IntelliJ bug: could not understand usage of methods from a subclass
  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {closingCallback} closeTask
   */
  onClose(closeTask) {
    this.closeTask = closeTask;
  }

  triggerClose() {
    close();
    if (this.closeTask) {
      this.closeTask();
    }
  }
}
