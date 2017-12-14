import $ from 'jquery';
import 'materialize-css/dist/js/materialize';


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
