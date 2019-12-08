"use strict";
var Pin = (function () {
    function Pin(container, left, top) {
        var _this = this;
        if (left === void 0) { left = '0'; }
        if (top === void 0) { top = '0'; }
        this.getElement = function () {
            return _this.pin;
        };
        this.setShiftHorizontal = function (startCoordinate, moveCoordinate, line) {
            if (_this.pin.offsetLeft < line.offsetWidth && _this.pin.offsetLeft >= 0) {
                return startCoordinate - moveCoordinate;
            }
            if (_this.pin.offsetLeft < 0)
                return -1;
            return 1;
        };
        this.setShiftVertical = function (startCoordinate, moveCoordinate, line) {
            if (_this.pin.offsetTop < line.offsetHeight && _this.pin.offsetTop >= 0) {
                return startCoordinate - moveCoordinate;
            }
            if (_this.pin.offsetTop < 0)
                return -1;
            return 1;
        };
        this.changePinPosition = function (top, left) {
            _this.pin.style.top = _this.pin.offsetTop - top + 'px';
            _this.pin.style.left = _this.pin.offsetLeft - left + 'px';
        };
        this.pin = document.createElement('div');
        this.pin.classList.add('slider__pin');
        this.pin.style.left = left;
        this.pin.style.top = top;
        container.append(this.pin);
    }
    return Pin;
}());
exports.__esModule = true;
exports["default"] = Pin;
//# sourceMappingURL=Pin.js.map