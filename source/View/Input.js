"use strict";
var Input = (function () {
    function Input(container, value, min, max) {
        var _this = this;
        this.getDomElement = function () {
            return _this.input;
        };
        this.setInputValue = function (value) {
            _this.input.value = value;
        };
        this.input = document.createElement('input');
        this.input.value = value;
        this.input.classList.add('slider__input');
        this.input.type = 'number';
        this.input.min = min;
        this.input.max = max;
        // this.input.setAttribute('readonly', true);
        container.append(this.input);
    }
    return Input;
}());
exports.__esModule = true;
exports["default"] = Input;
//# sourceMappingURL=Input.js.map