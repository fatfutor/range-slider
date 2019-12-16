"use strict";
var Slider = (function () {
    function Slider() {
        var _this = this;
        this.createSlider = function (container, options) {
            container.addClass('slider');
            _this.range = document.createElement('div');
            _this.range.classList.add('slider__range');
            _this.range.textContent = "\u043E\u0442 " + options.min + " - \u0434\u043E " + options.max;
            container.append(_this.range);
        };
        this.setMinMax = function (min, max) {
            _this.range.textContent = "\u043E\u0442 " + min + " - \u0434\u043E " + max;
        };
    }
    return Slider;
}());
exports.__esModule = true;
exports["default"] = Slider;
//# sourceMappingURL=Slider.js.map