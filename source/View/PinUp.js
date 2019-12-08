"use strict";
var PinUp = (function () {
    function PinUp(container) {
        var _this = this;
        this.getElement = function () {
            return _this.pinUp;
        };
        this.changePinUp = function (pin) {
            // this.pin.style.top = this.pin.offsetTop - top + 'px';
            _this.pinUp.textContent = pin.offsetLeft.toString();
        };
        this.pinUp = document.createElement('div');
        this.pinUp.classList.add('slider__pin-up');
        container.appendChild(this.pinUp);
    }
    return PinUp;
}());
exports.__esModule = true;
exports["default"] = PinUp;
//# sourceMappingURL=PinUp.js.map