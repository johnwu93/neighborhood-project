/**
 * @implements {MarkerView}
 */
export default class MarkerMock {
  constructor() {
    this.marker = false;
    this.clickTask = null;
  }

  // IntelliJ bug: could not understand usage of methods from a subclass
  // noinspection JSUnusedGlobalSymbols
  show() {
    this.marker = true;
  }

  triggerClick() {
    if (this.clickTask) {
      this.clickTask();
    }
  }

  // IntelliJ bug: could not understand usage of methods from a subclass
  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {clickCallback} clickTask
   */
  onClickListener(clickTask) {
    this.clickTask = clickTask;
  }
}
