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
    max: 300,
    value: [50, 150],
    step: 0,
    pinUp: true,
    orientation: 'horizontal',
  });
});

// $(function() {
//   $('#block2').myPlugin({
//     min: 200,
//     max: 500,
//     value: [200, 300],
//     step: 15,
//     pinUp: false,
//     orientation: 'horizontal',
//     double: false,
//   });
// });
