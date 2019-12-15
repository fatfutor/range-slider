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
    orientation: 'vertical',
  });
});

$(function() {
  $('#block2').myPlugin({
    min: 0,
    max: 100,
    value: [45],
    step: 3,
    pinUp: false,
    orientation: 'horizontal',
  });
});


//// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
//// - размер шага,
//// - вертикальный/горизонтальный вид,
//// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
//// - возможность включать/отключать элемент над бегунком
