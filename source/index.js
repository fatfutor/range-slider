"use strict";
require('./main.scss');
var presenter_1 = require('./presenter');
(function ($) {
    $.fn.myPlugin = function () {
        var block = $(this);
        presenter_1.dragAndDrop(block);
    };
})(jQuery);
$(function () {
    $('#block').myPlugin();
});
//# sourceMappingURL=index.js.map