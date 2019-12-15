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
    min: 200,
    max: 600,
    value: [300, 400],
    step: 0,
    pinUp: true,
    orientation: 'horizontal',
  });
});

$(function() {
  $('#block2').myPlugin({
    min: 0,
    max: 100,
    value: [50],
    step: 0,
    pinUp: true,
    orientation: 'horizontal',
  });
});
