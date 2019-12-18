import './main.scss';
// import Presenter from './Presenter';
import Panel from './main';

declare global {

  interface JQuery {
    myPlugin: any;
  }
}

(function($){
  $.fn.myPlugin = function(options) {
    // new Presenter($(this), options);
    new Panel($(this), options);
  };
})(jQuery);

$(function() {
  $('#block').myPlugin({
    min: 200,
    max: 600,
    values: [300, 400],
    step: 0,
    pinUp: true,
    orientation: 'vertical',
  });
});

$(function() {
  $('#block2').myPlugin({
    min: 0,
    max: 900,
    values: [45],
    step: 5,
    pinUp: false,
    orientation: 'horizontal',
  });
});
