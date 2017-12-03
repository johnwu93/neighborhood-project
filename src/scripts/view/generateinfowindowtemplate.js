/**
 *
 * @param {Business} business
 */
const generateInfoWindowTemplate = function generateInfoWindowTemplate(business) {
  const {name, rating, address, review} = business;
  return `
    <div>${name}</div>
    <div>${rating}</div>
    <div>${address}</div>
    <div>Review: ${review.text} <a href="${review.url}">Read Me</a></div>
`;
};

export default generateInfoWindowTemplate;
