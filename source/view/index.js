"use strict";
var View = (function () {
    function View(container) {
        var _this = this;
        this.createPin = function () {
            _this.pin = document.createElement('div');
            _this.pin.classList.add('pin');
            _this.container.append(_this.pin);
        };
        this.getPin = function () {
            return _this.pin;
        };
        this.container = container;
        this.createPin();
    }
    ;
    return View;
}());
exports.__esModule = true;
exports["default"] = View;
//# sourceMappingURL=index.js.map