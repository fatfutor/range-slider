"use strict";
var Pin_1 = require('../View/Pin');
var Input_1 = require('../View/Input');
var Line_1 = require('../View/Line');
var Presenter = (function () {
    function Presenter(view, model, block, options) {
        var _this = this;
        this.onPinMove = function (model, pin, input, options, idx) { return function (evt) {
            evt.preventDefault();
            var startCoordinates = {
                x: evt.clientX,
                y: evt.clientY
            };
            var dragged = false;
            var onMouseMove = function (moveEvt) {
                moveEvt.preventDefault();
                dragged = true;
                var shift = model.setShift(startCoordinates.x, moveEvt.clientX, _this.totalWidth, pin.getPinPosition(), options.step, _this.rangeKo);
                var pinPosition = model.calculatePinPosition(shift, _this.totalWidth);
                var pinUpValue = model.calculateContent(pinPosition, options, _this.totalWidth);
                _this.values[idx] = model.validateValue(_this.values, pinPosition, idx);
                pin.setPinValue(_this.values[idx], options.pinUp, pinUpValue);
                input.setInputValue(pinUpValue);
                _this.line.setLinePosition(_this.values);
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
                        pin.getDomElement().removeEventListener('click', onClickPreventDefault_1);
                    };
                    pin.getDomElement().addEventListener('click', onClickPreventDefault_1);
                }
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }; };
        view.createSlider(block, options);
        this.line = new Line_1["default"](block);
        this.totalWidth = this.line.getLineWidth();
        this.values = model.setStartValues(options.value, this.totalWidth, options.min, options.max);
        this.line.setLinePosition(this.values);
        this.pins = [];
        this.rangeKo = model.getRangeKo(this.totalWidth, options);
        options.value.forEach(function (it, idx) {
            var pinPosition = _this.totalWidth / (options.max - options.min) * (it - options.min);
            var pin = new Pin_1["default"](_this.line.getDomElement(), pinPosition, options.pinUp, it);
            var input = new Input_1["default"](block, it, options.min, options.max);
            pin.getDomElement().addEventListener('mousedown', _this.onPinMove(model, pin, input, options, idx));
            _this.pins.push({ pin: pin, input: input });
            // input.getDomElement().addEventListener('input', (ev) => {
            //   const pinPosition = model.calculatePinPosition((ev.target.value - options.min) / this.rangeKo, this.totalWidth);
            //   const pinUpValue = model.calculateContent((ev.target.value - options.min) / this.rangeKo, options, this.totalWidth);
            //
            //   this.values[idx] = model.validateValue(this.values, pinPosition, idx);
            //
            //   pin.setPinValue(this.values[idx], options.pinUp, pinUpValue);
            //   pin.setPinValue(pinPosition, options.pinUp, pinUpValue);
            //
            //   this.line.setLinePosition(this.values);
            // });
        });
    }
    ;
    return Presenter;
}());
exports.__esModule = true;
exports["default"] = Presenter;
;
//# sourceMappingURL=index.js.map