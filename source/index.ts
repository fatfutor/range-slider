import './main.scss';
import Model from './Model';
import View from './View';
import Presenter from './Presenter';

declare global {
  interface JQuery {
    myPlugin: any;
  }
}

(function($){
  $.fn.myPlugin = function() {

    const block: any = $(this);
    const view = new View(block);
    const model = new Model();
    new Presenter(view, model);

  };
})(jQuery);

$(function() {
  $('#block').myPlugin();
});
