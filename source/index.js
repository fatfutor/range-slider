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
        min: 0,
        max: 100,
        value: 50,
        step: 0,
        pinUp: true,
        orientation: 'horizontal',
        double: false
    });
});
$(function () {
    $('#block2').myPlugin({
        min: 200,
        max: 500,
        value: 200,
        step: 15,
        pinUp: false,
        orientation: 'horizontal',
        double: false
    });
});
//# sourceMappingURL=index.js.map