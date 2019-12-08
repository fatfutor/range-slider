"use strict";
var Input = (function () {
    function Input(container, value) {
        var _this = this;
        if (value === void 0) { value = '0'; }
        this.getElement = function () {
            return _this.input;
        };
        this.input = document.createElement('input');
        this.input.setAttribute('value', value);
        this.input.classList.add('slider__input');
        container.append(this.input);
    }
    return Input;
}());
exports.__esModule = true;
exports["default"] = Input;
//# sourceMappingURL=Input.js.map