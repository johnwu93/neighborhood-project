/**
 * @description Interface for an infoWindow on a map
 * @interface InfoWindowView
 */

/**
 * @function
 * @template MarkerViewType
 * hack: This is suppose to be an upper-bounded generic for MarkerView.
 * This would restrict different implementations of InfoWindowView to use a specific type
 * @param {MarkerViewType} markerView
 * @param {string} content
 * @name InfoWindowView#display
 */

/**
 * @function
 * @name InfoWindowView#close
 */

/**
 * @callback closingCallback
 */

/**
 * @description when this window closes in the UI, an event will be triggered
 * @param {closingCallback} closingInfoWindowCallBack
 * @name InfoWindowView#onClose
 */
