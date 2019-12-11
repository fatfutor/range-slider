"use strict";
var View = (function () {
    function View() {
        var _this = this;
        this.createSlider = function (container, options) {
            container.addClass('slider');
            _this.range = document.createElement('div');
            _this.range.classList.add('slider__range');
            _this.range.textContent = "\u043E\u0442 " + options.min + " - \u0434\u043E " + options.max;
            container.append(_this.range);
            _this.line = document.createElement('div');
            _this.line.classList.add('slider__line');
            container.append(_this.line);
            _this.input = document.createElement('input');
            _this.input.value = options.value;
            _this.input.classList.add('slider__input');
            _this.input.type = 'number';
            _this.input.min = options.min;
            _this.input.max = options.max;
            // this.input.setAttribute('readonly', true);
            container.append(_this.input);
            _this.innerLine = document.createElement('div');
            _this.innerLine.classList.add('slider__inner-line');
            _this.line.appendChild(_this.innerLine);
        };
        this.getLine = function () {
            return _this.line;
        };
        this.getInnerLine = function () {
            return _this.innerLine;
        };
        this.getInput = function () {
            return _this.input;
        };
    }
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