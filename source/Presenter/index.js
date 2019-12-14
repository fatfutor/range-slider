"use strict";
var Pin_1 = require('../View/Pin');
var Presenter = (function () {
    function Presenter(view, model, block, options) {
        var _this = this;
        view.createSlider(block, options);
        this.input = view.getInput();
        this.line = view.getLine();
        this.pin = new Pin_1["default"](this.line, options.value, options.pinUp);
        // this.pin2 = new Pin(this.line, options.value, options.pinUp);
        this.innerLine = view.getInnerLine();
        this.totalWidth = this.line.offsetWidth;
        this.rangeKo = model.getRangeKo(this.line.offsetWidth, options);
        var pinPosition = model.calculatePinPosition((options.value - options.min) / this.rangeKo, this.totalWidth);
        var pinUpValue = model.calculateContent(pinPosition, options, this.totalWidth);
        this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);
        this.innerLine.style.width = pinPosition + 'px';
        this.input.addEventListener('input', function (ev) {
            var pinPosition = model.calculatePinPosition((ev.target.value - options.min) / _this.rangeKo, _this.totalWidth);
            var pinUpValue = model.calculateContent((ev.target.value - options.min) / _this.rangeKo, options, _this.totalWidth);
            _this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);
            _this.innerLine.style.width = pinPosition + 'px';
        });
        this.pin.getDomElement().addEventListener('mousedown', function (evt) {
            evt.preventDefault();
            var startCoordinates = {
                x: evt.clientX,
                y: evt.clientY
            };
            var dragged = false;
            var onMouseMove = function (moveEvt) {
                moveEvt.preventDefault();
                dragged = true;
                var shift = model.setShift(startCoordinates.x, moveEvt.clientX, _this.totalWidth, _this.pin.getPinPosition(), options.step, _this.rangeKo);
                var pinPosition = model.calculatePinPosition(shift, _this.totalWidth);
                var pinUpValue = model.calculateContent(pinPosition, options, _this.totalWidth);
                _this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);
                _this.input.value = pinUpValue.toString();
                _this.innerLine.style.width = pinPosition + 'px';
                if (moveEvt.clientX - startCoordinates.x >= options.step / _this.rangeKo
                    || startCoordinates.x - moveEvt.clientX >= options.step / _this.rangeKo) {
                    startCoordinates = {
                        x: moveEvt.clientX,
                        y: moveEvt.clientY
                    };
                }
            };
            var onMouseUp = function (upEvt) {
                upEvt.preventDefault();
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                if (dragged) {
                    var onClickPreventDefault_1 = function (evt) {
                        evt.preventDefault();
                        _this.pin.getDomElement().removeEventListener('click', onClickPreventDefault_1);
                    };
                    _this.pin.getDomElement().addEventListener('click', onClickPreventDefault_1);
                }
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }
    ;
    return Presenter;
}());
exports.__esModule = true;
exports["default"] = Presenter;
;
//# sourceMappingURL=index.js.map