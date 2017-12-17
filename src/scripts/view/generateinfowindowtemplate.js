/**
 * @description template for InfoWindow
 * @param {Business} business
 */
const generateInfoWindowTemplate = function generateInfoWindowTemplate(business) {
  const {name, rating, address, review, photo} = business;
  const [street, city] = address.split(/,(.*)/);
  const {text, url} = review;
  return `<div class="info-window-container">
      <div class="row flex">
        <section class="col s12 l6">
          <h5>
            <a href="#">${name}</a>
          </h5>
          <article class="info-text">
            <div class="btn">${rating}</div>
            <div class="hide-on-med-and-down">${street}</div>
            <div class="hide-on-med-and-down">${city}</div>
            <h6 class="hide-on-large-only">
              <a href="${url}">Read Review!</a>
            </h6>
          </article>
        </section>
        <section class="col l6 hide-on-med-and-down">
          <img src="${photo}" class="photo" alt="">
        </section>
      </div>
      <section class="hide-on-med-and-down">
        <article class="truncate">
          <a class="review" href="${url}"><i class="material-icons">comment</i></a> ${text} 
         </article>
      </section>
   </div>`;
};

export default generateInfoWindowTemplate;
