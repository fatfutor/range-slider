import './main.scss';
import Presenter from './Presenter';
import View from './View';

declare global {
  interface JQuery {
    myPlugin: any;
  }
}

(function($){
  $.fn.myPlugin = function() {

    const block: any = $(this);
    const view = new View(block);
    new Presenter(view.getPin());

  };
})(jQuery);

$(function() {
  $('#block').myPlugin();
});
