"use strict";
var View = (function () {
    function View(container) {
        var _this = this;
        this.createLine = function () {
            _this.line = document.createElement('div');
            _this.line.classList.add('slider__line');
            _this.container.append(_this.line);
        };
        this.createPin = function () {
            _this.pin = document.createElement('div');
            _this.pin.classList.add('slider__pin');
            _this.line.appendChild(_this.pin);
        };
        this.createPinNumeric = function (pin) {
            _this.pinNumeric = document.createElement('p');
            _this.pinNumeric.classList.add('slider__pin-up');
            pin.appendChild(_this.pinNumeric);
        };
        this.getPin = function () {
            return _this.pin;
        };
        this.getPinNumeric = function () {
            return _this.pinNumeric;
        };
        this.getLine = function () {
            return _this.line;
        };
        this.changePinPosition = function (top, left) {
            // this.pin.style.top = this.pin.offsetTop - top + 'px';
            _this.pin.style.left = _this.pin.offsetLeft - left + 'px';
        };
        this.changePinNumeric = function (pin) {
            // this.pin.style.top = this.pin.offsetTop - top + 'px';
            _this.pinNumeric.textContent = pin.offsetLeft.toString();
        };
        this.setShiftHorizontal = function (startCoordinate, moveCoordinate, pin, line) {
            if (pin.offsetLeft < line.offsetWidth && pin.offsetLeft >= 0) {
                return startCoordinate - moveCoordinate;
            }
            if (pin.offsetLeft < 0)
                return -1;
            return 1;
        };
        this.setShiftVertical = function (startCoordinate, moveCoordinate, pin, line) {
            if (pin.offsetTop < line.offsetHeight && pin.offsetTop >= 0) {
                return startCoordinate - moveCoordinate;
            }
            if (pin.offsetTop < 0)
                return -1;
            return 1;
        };
        this.container = container;
        this.container.addClass('slider');
        this.createLine();
        this.createPin();
    }
    ;
    return View;
}());
exports.__esModule = true;
exports["default"] = View;
// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
// - два бегунка?
// - размер шага,
// - вертикальный/горизонтальный вид,
// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
// - возможность включать/отключать элемент над бегунком,
// который показывает значение и который ползает за мышкой
// (при выключении просто кругляш сам только на слайдера, при включении над кругляшом элемент с цифрой).
//# sourceMappingURL=index.js.map