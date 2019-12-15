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
                var coordinate = (options.orientation === 'vertical') ? startCoordinates.y : startCoordinates.x;
                var move = (options.orientation === 'vertical') ? moveEvt.clientY : moveEvt.clientX;
                var shift = model.setShift(coordinate, move, _this.totalSize, pin.getPinPosition(), options.step, _this.rangeKo);
                var pinPosition = model.calculatePinPosition(shift, _this.totalSize);
                var pinUpValue = model.calculateContent(pinPosition, options, _this.totalSize);
                _this.values[idx] = model.validateValue(_this.values, pinPosition, idx);
                pin.setPinValue(_this.values[idx], options.pinUp, pinUpValue);
                input.setInputValue(pinUpValue);
                _this.line.setLinePosition(_this.values);
                if (move - coordinate >= options.step / _this.rangeKo || coordinate - move >= options.step / _this.rangeKo) {
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
        this.line = new Line_1["default"](block, options.orientation);
        this.totalSize = this.line.getLineSize();
        this.values = model.setStartValues(options.value, this.totalSize, options.min, options.max);
        this.line.setLinePosition(this.values);
        this.pins = [];
        this.rangeKo = model.getRangeKo(this.totalSize, options);
        options.value.forEach(function (it, idx) {
            var pinPosition = _this.totalSize / (options.max - options.min) * (it - options.min);
            var pin = new Pin_1["default"](_this.line.getDomElement(), pinPosition, options.pinUp, it, options.orientation);
            var input = new Input_1["default"](block, it, options.min, options.max);
            pin.getDomElement().addEventListener('mousedown', _this.onPinMove(model, pin, input, options, idx));
            _this.pins.push({ pin: pin, input: input });
            // input.getDomElement().addEventListener('input', (ev) => {
            //   const pinPosition = model.calculatePinPosition((ev.target.value - options.min) / this.rangeKo, this.totalSize);
            //   const pinUpValue = model.calculateContent((ev.target.value - options.min) / this.rangeKo, options, this.totalSize);
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