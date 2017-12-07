
/**
 *
 * @param {BusinessMarker} businessMarker
 * @return {{name: string, id: number}}
 */
function createBusinessIdPair(businessMarker) {
  const {business, id} = businessMarker;
  const {name} = business;
  return {name, id};
}


export default createBusinessIdPair;
