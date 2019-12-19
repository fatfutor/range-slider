/// <reference path="./globals.d.ts" />
"use strict";
require('./main.scss');
// import Presenter from './Presenter';
var Panel_1 = require('./Panel');
(function ($) {
    $.fn.myPlugin = function (options) {
        // new Presenter($(this), options);
        new Panel_1["default"]($(this), options);
    };
})(jQuery);
$(function () {
    $('#block').myPlugin({
        min: 200,
        max: 600,
        values: [300, 400],
        step: 0,
        pinUp: true,
        orientation: 'vertical'
    });
});
$(function () {
    $('#block2').myPlugin({
        min: 0,
        max: 900,
        values: [45],
        step: 5,
        pinUp: false,
        orientation: 'horizontal'
    });
});
//# sourceMappingURL=index.js.map