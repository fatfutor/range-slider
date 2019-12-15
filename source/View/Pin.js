"use strict";
var Pin = (function () {
    function Pin(container, value, pinUp, pinUpValue, orientation) {
        var _this = this;
        if (orientation === void 0) { orientation = 'horizontal'; }
        this.getDomElement = function () {
            return _this.pin;
        };
        this.setPinValue = function (value, pinUp, pinUpValue) {
            if (pinUpValue === void 0) { pinUpValue = 0; }
            switch (_this.orientation) {
                case 'horizontal':
                    _this.pin.style.left = value + 'px';
                    break;
                case 'vertical':
                    _this.pin.style.top = value + 'px';
                    break;
            }
            if (pinUp) {
                _this.pinUp.textContent = pinUpValue.toString();
            }
        };
        this.setStartPinValue = function (value) {
            switch (_this.orientation) {
                case 'horizontal':
                    _this.pin.style.left = value + 'px';
                    break;
                case 'vertical':
                    _this.pin.style.top = value + 'px';
                    break;
            }
        };
        this.getPinPosition = function () {
            switch (_this.orientation) {
                case 'horizontal': return _this.pin.offsetLeft;
                case 'vertical': return _this.pin.offsetTop;
            }
        };
        this.orientation = orientation;
        this.pin = document.createElement('div');
        this.pin.classList.add('slider__pin');
        this.setStartPinValue(value);
        container.appendChild(this.pin);
        if (pinUp) {
            var pinUpOrientationClass = (this.orientation === 'vertical')
                ? 'slider__pin-up--vertical'
                : 'slider__pin-up--horizontal';
            this.pinUp = document.createElement('div');
            this.pinUp.classList.add('slider__pin-up', pinUpOrientationClass);
            this.pinUp.textContent = pinUpValue.toString();
            this.pin.appendChild(this.pinUp);
        }
    }
    return Pin;
}());
exports.__esModule = true;
exports["default"] = Pin;
//# sourceMappingURL=Pin.js.map