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
                _this.pinValues[idx] = model.validateData(_this.pinValues, pinPosition, idx);
                pin.setPinValue(_this.pinValues[idx], options.pinUp, pinUpValue);
                input.setInputValue(pinUpValue);
                _this.line.setLinePosition(_this.pinValues);
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
        this.pinValues = model.setStartValues(options.values, this.totalSize, options.min, options.max);
        this.pinUpValues = options.values.slice();
        this.line.setLinePosition(this.pinValues);
        this.rangeKo = model.getRangeKo(this.totalSize, options);
        options.values.forEach(function (it, idx) {
            var pinPosition = _this.totalSize / (options.max - options.min) * (it - options.min);
            var pin = new Pin_1["default"](_this.line.getDomElement(), pinPosition, options.pinUp, it, options.orientation);
            var input = new Input_1["default"](block, it, options.min, options.max);
            pin.getDomElement().addEventListener('mousedown', _this.onPinMove(model, pin, input, options, idx));
            input.getDomElement().addEventListener('change', function (ev) {
                var pinPosition = model.calculatePinPosition((ev.target.value - options.min) / _this.rangeKo, _this.totalSize);
                var pinUpValue = model.calculateContent((ev.target.value - options.min) / _this.rangeKo, options, _this.totalSize);
                _this.pinValues[idx] = model.validateData(_this.pinValues, pinPosition, idx);
                _this.pinUpValues[idx] = model.validateData(_this.pinUpValues, pinUpValue, idx);
                ev.target.value = _this.pinUpValues[idx];
                pin.setPinValue(_this.pinValues[idx], options.pinUp, _this.pinUpValues[idx]);
                _this.line.setLinePosition(_this.pinValues);
            });
        });
    }
    ;
    return Presenter;
}());
exports.__esModule = true;
exports["default"] = Presenter;
;
//# sourceMappingURL=index.js.map