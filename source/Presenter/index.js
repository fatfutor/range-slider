"use strict";
var Pin_1 = require('../View/Pin');
var Input_1 = require('../View/Input');
var Line_1 = require('../View/Line');
var Model_1 = require('../Model');
var Slider_1 = require('../View/Slider');
var Presenter = (function () {
    function Presenter(block, options) {
        var _this = this;
        this.renderDomElements = function () {
            _this.pinValues = _this.model.setStartValues(_this.options.values, _this.totalSize, _this.options.min, _this.options.max);
            _this.line = new Line_1["default"](_this.block, _this.options.orientation);
            _this.line.setLinePosition(_this.pinValues);
            _this.options.values.forEach(function (it, idx) {
                var pinPosition = _this.totalSize / (_this.options.max - _this.options.min) * (it - _this.options.min);
                var pin = new Pin_1["default"](_this.line.getDomElement(), pinPosition, _this.options.pinUp, it, _this.options.orientation);
                var input = new Input_1["default"](_this.block, it, _this.options.min, _this.options.max);
                pin.getDomElement().addEventListener('mousedown', _this.onPinMove(_this.model, pin, input, _this.options, idx));
                input.getDomElement().addEventListener('change', function (ev) {
                    var pinPosition = _this.model.calculatePinPosition((ev.target.value - _this.options.min) / _this.rangeKo, _this.totalSize);
                    var pinUpValue = _this.model.calculateContent((ev.target.value - _this.options.min) / _this.rangeKo, _this.options, _this.totalSize);
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
                var coordinate = (options.orientation === 'vertical') ? startCoordinates.y : startCoordinates.x;
                var move = (options.orientation === 'vertical') ? moveEvt.clientY : moveEvt.clientX;
                var shift = model.setShift(coordinate, move, _this.totalSize, pin.getPinPosition(), _this.options.step, _this.rangeKo);
                var pinPosition = model.calculatePinPosition(shift, _this.totalSize);
                var pinUpValue = model.calculateContent(pinPosition, options, _this.totalSize);
                _this.pinValues[idx] = model.validateData(_this.pinValues, pinPosition, idx);
                pin.setPinValue(_this.pinValues[idx], options.pinUp, pinUpValue);
                input.setInputValue(pinUpValue);
                _this.line.setLinePosition(_this.pinValues);
                if (move - coordinate >= _this.options.step / _this.rangeKo || coordinate - move >= _this.options.step / _this.rangeKo) {
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
        this.changeOptions = function (options) {
            $('.slider__line').remove();
            $('.slider__input').remove();
            console.log('options', options);
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
        // this.totalSize = this.line.getLineSize();
        this.totalSize = 300;
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