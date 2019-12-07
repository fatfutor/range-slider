"use strict";
require('./main.scss');
var Model_1 = require('./Model');
var View_1 = require('./View');
var Presenter_1 = require('./Presenter');
(function ($) {
    $.fn.myPlugin = function () {
        var block = $(this);
        var view = new View_1["default"](block);
        var model = new Model_1["default"]();
        new Presenter_1["default"](view, model);
    };
})(jQuery);
$(function () {
    $('#block').myPlugin();
});
//# sourceMappingURL=index.js.map