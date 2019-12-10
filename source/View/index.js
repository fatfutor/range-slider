"use strict";
var View = (function () {
    function View() {
        var _this = this;
        this.createSlider = function (container, options) {
            _this.line = document.createElement('div');
            _this.line.classList.add('slider__line');
            container.append(_this.line);
            _this.input = document.createElement('input');
            _this.input.value = options.value;
            _this.input.classList.add('slider__input');
            _this.input.type = 'number';
            _this.input.min = options.min;
            _this.input.max = options.max;
            container.append(_this.input);
            _this.pin = document.createElement('div');
            _this.pin.classList.add('slider__pin');
            _this.line.appendChild(_this.pin);
            if (options.pinUp) {
                _this.pinUp = document.createElement('div');
                _this.pinUp.classList.add('slider__pin-up');
                _this.pinUp.textContent = options.value;
                _this.pin.appendChild(_this.pinUp);
            }
        };
        this.getPin = function () {
            return _this.pin;
        };
        this.getLine = function () {
            return _this.line;
        };
        this.getInput = function () {
            return _this.input;
        };
        this.getPinUp = function () {
            return _this.pinUp;
        };
    }
    ;
    return View;
}());
exports.__esModule = true;
exports["default"] = View;
//// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
//// - размер шага,
// - вертикальный/горизонтальный вид,
// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
//// - возможность включать/отключать элемент над бегунком,
////который показывает значение и который ползает за мышкой
//// (при выключении просто кругляш сам только на слайдера, при включении над кругляшом элемент с цифрой).
//# sourceMappingURL=index.js.map