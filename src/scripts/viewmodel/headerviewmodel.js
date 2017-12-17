import $ from 'jquery';
import 'materialize-css/dist/js/materialize';

/**
 * @description If the side navigation bar is open, then the header will open.
 */
const bindHeader = function bindHeader() {
  const $header = $('header');
  $('.button-collapse').sideNav({
    onOpen: () => {
      $header.addClass('hide');
    },
    onClose: () => {
      $header.removeClass('hide');
    },
  });
};

export default bindHeader;
