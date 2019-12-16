"use strict";
var Presenter_1 = require('./Presenter');
exports.slider = function (block, options) {
    if (block[0].id === 'block') {
        var container = document.querySelector('#block');
        var presenter = new Presenter_1["default"](block, options);
        presenter.changeOptions({ step: 20, min: 100, max: 500, orientation: 'horizontal', pinUp: false });
    }
};
exports.slider2 = function (block, options) {
    if (block[0].id === 'block2') {
        new Presenter_1["default"](block, options);
    }
};
//# sourceMappingURL=main.js.map