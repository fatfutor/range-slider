"use strict";
var View = (function () {
    function View(container) {
        var _this = this;
        this.createLine = function () {
            _this.line = document.createElement('div');
            _this.line.classList.add('slider__line');
            _this.container.append(_this.line);
        };
        this.createPin = function () {
            _this.pin = document.createElement('div');
            _this.pin.classList.add('slider__pin');
            _this.line.appendChild(_this.pin);
        };
        this.getPin = function () {
            return _this.pin;
        };
        this.getLine = function () {
            return _this.line;
        };
        this.changePinPosition = function (top, left) {
            // this.pin.style.top = this.pin.offsetTop - top + 'px';
            _this.pin.style.left = _this.pin.offsetLeft - left + 'px';
        };
        this.container = container;
        this.container.addClass('slider');
        this.createLine();
        this.createPin();
    }
    ;
    return View;
}());
exports.__esModule = true;
exports["default"] = View;
//# sourceMappingURL=index.js.map