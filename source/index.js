"use strict";
require('./main.scss');
var Panel_1 = require('./Panel');
(function ($) {
    $.fn.myPlugin = function (options) {
        new Panel_1.default($(this), options);
    };
})(jQuery);
$(function () {
    $('#block').myPlugin({
        min: 200,
        max: 600,
        values: [300, 400],
        step: 0,
        pinUp: true,
        orientation: 'vertical',
    });
});
$(function () {
    $('#block2').myPlugin({
        min: 0,
        max: 900,
        values: [60],
        step: 30,
        pinUp: false,
        orientation: 'horizontal',
    });
});
$(function () {
    $('#block3').myPlugin({
        min: 0,
        max: 100,
        values: [60, 90],
        step: 0,
        pinUp: false,
        orientation: 'horizontal',
    });
});
$(function () {
    $('#block4').myPlugin({
        min: 0,
        max: 300,
        values: [0],
        step: 0,
        pinUp: false,
        orientation: 'vertical',
    });
});
//# sourceMappingURL=index.js.map