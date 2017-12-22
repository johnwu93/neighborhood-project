import Materialize from 'materialize-css/dist/js/materialize';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyCW6adgGSbXijMqJsDFWYDN5_2lfAjon1c';
/**
 * @description Hack to add fallback when google-maps fails to load.
 */
const failGoogleMaps = function failGoogleMaps() {
  Materialize.toast('Failed to load Google Maps. Please try again', 4000);
  throw Error('Failed to Google Maps. Aborting app...');
};

const getGoogleMapsNode = function getGoogleMapsNode() {
  const scriptNodes =
    document.getElementsByTagName('script');

  // noinspection JSUnresolvedVariable
  const googleScriptNodes = Array.prototype.filter.call(scriptNodes,
    node => node.src.search(GoogleMapsLoader.URL) !== -1,
  );
  if (googleScriptNodes.length !== 1) {
    throw RangeError('Expected to have only one Google Maps script in body');
  }
  return googleScriptNodes[0];
};

GoogleMapsLoader.createLoader = new Proxy(GoogleMapsLoader.createLoader, {
  apply(method) {
    method();
    const googleScriptNode = getGoogleMapsNode();
    googleScriptNode.onerror = failGoogleMaps;
  },
});

const googleMapsLoaderFactory = function googleMapsLoaderFactory() {
  return GoogleMapsLoader;
};


export default googleMapsLoaderFactory;
