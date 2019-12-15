"use strict";
require('./main.scss');
var Model_1 = require('./Model');
var View_1 = require('./View');
var Presenter_1 = require('./Presenter');
(function ($) {
    $.fn.myPlugin = function (options) {
        var block = $(this);
        var view = new View_1["default"]();
        var model = new Model_1["default"]();
        new Presenter_1["default"](view, model, block, options);
    };
})(jQuery);
$(function () {
    $('#block').myPlugin({
        min: 200,
        max: 600,
        value: [300, 400],
        step: 0,
        pinUp: true,
        orientation: 'vertical'
    });
});
$(function () {
    $('#block2').myPlugin({
        min: 0,
        max: 100,
        value: [45],
        step: 3,
        pinUp: false,
        orientation: 'horizontal'
    });
});
//// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
//// - размер шага,
//// - вертикальный/горизонтальный вид,
//// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
//// - возможность включать/отключать элемент над бегунком
//# sourceMappingURL=index.js.map