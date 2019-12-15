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
        };
    }
    return View;
}());
exports.__esModule = true;
exports["default"] = View;
//// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
//// - размер шага,
// - вертикальный/горизонтальный вид,
//// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
//// - возможность включать/отключать элемент над бегунком,
////который показывает значение и который ползает за мышкой
//// (при выключении просто кругляш сам только на слайдера, при включении над кругляшом элемент с цифрой).
//# sourceMappingURL=index.js.map