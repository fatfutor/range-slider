"use strict";
var Pin = (function () {
    function Pin(container, value, pinUp) {
        var _this = this;
        this.getDomElement = function () {
            return _this.pin;
        };
        this.setPinValue = function (value, pinUp, pinUpValue) {
            if (pinUpValue === void 0) { pinUpValue = 0; }
            _this.pin.style.left = value + 'px';
            if (pinUp) {
                _this.pinUp.textContent = pinUpValue.toString();
            }
        };
        this.getPinPosition = function () {
            return _this.pin.offsetLeft;
        };
        this.pin = document.createElement('div');
        this.pin.classList.add('slider__pin');
        this.pin.style.left = value + 'px';
        container.appendChild(this.pin);
        if (pinUp) {
            this.pinUp = document.createElement('div');
            this.pinUp.classList.add('slider__pin-up');
            this.pinUp.textContent = value.toString();
            this.pin.appendChild(this.pinUp);
        }
    }
    return Pin;
}());
exports.__esModule = true;
exports["default"] = Pin;
//# sourceMappingURL=Pin.js.map