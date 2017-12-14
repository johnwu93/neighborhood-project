/**
 *
 * @param {Business} business
 */
const generateInfoWindowTemplate = function generateInfoWindowTemplate(business) {
  const {name, rating, address, review} = business;
  const [street, city] = address.split(/,(.*)/);
  const {text, url} = review;
  return `<div class="info-window-container">
      <div class="row">
        <section class="col s6">
          <h5>
            <a href="#">${name}</a>
          </h5>
          <article class="info-text">
            <div class="btn">${rating}</div>
            <div>${street}</div>
            <div>${city}</div>
          </article>
        </section>
        <section class="col s6">
          <img src="http://via.placeholder.com/350x150" alt="">
        </section>
      </div>
      <article class="truncate"> Review: ${text} </article>
      <a href="${url}">Read More</a>
   </div>`;
};

export default generateInfoWindowTemplate;
