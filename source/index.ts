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
  $.fn.myPlugin = function(options) {

    const block: any = $(this);
    const view = new View();
    const model = new Model();
    new Presenter(view, model, block, options);

  };
})(jQuery);

$(function() {
  $('#block').myPlugin({
    min: 0,
    max: 100,
    value: 0,
    step: 10,
    orientation: 'horizontal',
    pinUp: true,
    double: false,
  });
});
