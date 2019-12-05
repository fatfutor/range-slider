import './main.scss';
import { dragAndDrop } from './presenter';

declare global {
  interface JQuery {
    myPlugin: any;
  }
}

(function($){
  $.fn.myPlugin = function() {

    const block: any = $(this);
    dragAndDrop(block);

  };
})(jQuery);

$(function() {
  $('#block').myPlugin();
});
