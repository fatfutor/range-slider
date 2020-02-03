// / <reference path="./globals.d.ts" />

import './main.scss';
// import Presenter from './Presenter';
import Panel from './Panel';

(function ($) {
  $.fn.myPlugin = function (options: Options) {
    // new Presenter($(this), options);
    new Panel($(this), options);
  };
}(jQuery));

$(() => {
  $('#block').myPlugin({
    min: 200,
    max: 600,
    values: [300, 400],
    step: 0,
    pinUp: true,
    orientation: 'vertical',
  });
});

$(() => {
  $('#block2').myPlugin({
    min: 0,
    max: 900,
    values: [60],
    step: 30,
    pinUp: false,
    orientation: 'horizontal',
  });
});

$(() => {
  $('#block3').myPlugin({
    min: 0,
    max: 100,
    values: [60, 90],
    step: 0,
    pinUp: false,
    orientation: 'horizontal',
  });
});

$(() => {
  $('#block4').myPlugin({
    min: 0,
    max: 300,
    values: [0],
    step: 0,
    pinUp: false,
    orientation: 'vertical',
  });
});
