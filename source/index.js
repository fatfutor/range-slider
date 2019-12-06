"use strict";
require('./main.scss');
var Presenter_1 = require('./Presenter');
var View_1 = require('./View');
(function ($) {
    $.fn.myPlugin = function () {
        var block = $(this);
        var view = new View_1["default"](block);
        new Presenter_1["default"](view.getPin());
    };
})(jQuery);
$(function () {
    $('#block').myPlugin();
});
//# sourceMappingURL=index.js.map