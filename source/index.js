"use strict";
require('./main.scss');
var Model_1 = require('./Model');
var View_1 = require('./View');
var Presenter_1 = require('./Presenter');
(function ($) {
    $.fn.myPlugin = function (options) {
        var block = $(this);
        var view = new View_1["default"](block);
        var model = new Model_1["default"]();
        new Presenter_1["default"](view, model, options);
    };
})(jQuery);
$(function () {
    $('#block').myPlugin({
        min: 0,
        max: 1000,
        current: 0,
        interval: 0,
        orientation: 'horizontal',
        pinNumeric: true,
        double: false
    });
});
//# sourceMappingURL=index.js.map