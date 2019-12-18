"use strict";
var Pin_1 = require('../View/Pin');
var Input_1 = require('../View/Input');
var Line_1 = require('../View/Line');
var Model_1 = require('../Model');
var Slider_1 = require('../View/Slider');
var SLIDER_SIZE = 300;
var Presenter = (function () {
    function Presenter(block, options) {
        var _this = this;
        this.renderDomElements = function () {
            _this.validateOptions();
            _this.rangeKo = _this.model.getRangeKo(_this.totalSize, _this.options);
            _this.pinValues = _this.model.setStartValues(_this.options.values, _this.totalSize, _this.options.min, _this.options.max);
            _this.line = new Line_1["default"](_this.block, _this.options.orientation);
            _this.line.setLinePosition(_this.pinValues);
            _this.options.values.forEach(function (it, idx) {
                var pinPosition = _this.totalSize / (_this.options.max - _this.options.min) * (it - _this.options.min);
                var pin = new Pin_1["default"](_this.line.getDomElement(), pinPosition, _this.options.pinUp, it, _this.options.orientation);
                var input = new Input_1["default"](_this.block, it, _this.options.min, _this.options.max);
                pin.getDomElement().addEventListener('mousedown', _this.onPinMove(_this.model, pin, input, _this.options, idx));
                input.getDomElement().addEventListener('change', function (ev) {
                    var position = (ev.target.value - _this.options.min) / _this.rangeKo;
                    var pinPosition = _this.model.calculatePinPosition(0, position, _this.totalSize);
                    var pinUpValue = _this.model.calculateContent(pinPosition, _this.options, _this.totalSize);
                    _this.pinValues[idx] = _this.model.validateData(_this.pinValues, pinPosition, idx);
                    _this.pinUpValues[idx] = _this.model.validateData(_this.pinUpValues, pinUpValue, idx);
                    ev.target.value = _this.pinUpValues[idx];
                    pin.setPinValue(_this.pinValues[idx], _this.options.pinUp, _this.pinUpValues[idx]);
                    _this.line.setLinePosition(_this.pinValues);
                });
            });
        };
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
                var shift = model.setShift(startCoordinates, moveEvt, options.orientation);
                if (options.step) {
                    if (shift >= options.step / _this.rangeKo) {
                        shift = Math.round(options.step / _this.rangeKo);
                    }
                    else if (-shift >= options.step / _this.rangeKo) {
                        shift = -Math.round(options.step / _this.rangeKo);
                    }
                    else {
                        return;
                    }
                }
                var pinPosition = model.calculatePinPosition(shift, pin.getPinPosition(), _this.totalSize);
                var pinUpValue = model.calculateContent(pinPosition, options, _this.totalSize, options.step);
                _this.pinValues[idx] = model.validateData(_this.pinValues, pinPosition, idx);
                pin.setPinValue(_this.pinValues[idx], options.pinUp, pinUpValue);
                input.setInputValue(pinUpValue);
                _this.line.setLinePosition(_this.pinValues);
                startCoordinates = {
                    x: moveEvt.clientX,
                    y: moveEvt.clientY
                };
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
        this.validateOptions = function () {
            _this.options.min = _this.model.validateMin(_this.options.min, _this.options.max);
            _this.options.values = _this.model.validatePinValues([_this.options.min, _this.options.max], _this.options.values);
        };
        this.changeOptions = function (options) {
            var blockId = "#" + _this.block[0].id;
            $(blockId + " .slider__line").remove();
            $(blockId + " .slider__input").remove();
            _this.options.step = options.step;
            _this.options.min = options.min;
            _this.options.max = options.max;
            _this.options.pinUp = options.pinUp;
            _this.options.orientation = options.orientation;
            _this.slider.setMinMax(options.min, options.max);
            _this.renderDomElements();
        };
        this.block = block;
        this.options = options;
        this.slider = new Slider_1["default"]();
        this.slider.createSlider(this.block, this.options);
        this.model = new Model_1["default"]();
        this.totalSize = SLIDER_SIZE;
        this.pinUpValues = this.options.values.slice();
        this.rangeKo = this.model.getRangeKo(this.totalSize, this.options);
        this.renderDomElements();
    }
    ;
    return Presenter;
}());
exports.__esModule = true;
exports["default"] = Presenter;
;
//# sourceMappingURL=index.js.map