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
        min: 100,
        max: 1000,
        value: 400,
        interval: 0,
        orientation: 'horizontal',
        pinUp: true,
        double: false
    });
});
//# sourceMappingURL=index.js.map