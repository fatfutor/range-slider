"use strict";
var Pin_1 = require('../View/Pin');
var Input_1 = require('../View/Input');
var Line_1 = require('../View/Line');
var Presenter = (function () {
    function Presenter(view, model, block, options) {
        var _this = this;
        view.createSlider(block, options);
        this.line = new Line_1["default"](block);
        this.pin = new Pin_1["default"](this.line.getDomElement(), options.value[0], options.pinUp);
        this.input = new Input_1["default"](block, options.value[0], options.min, options.max);
        if (options.value.length === 2) {
            this.pin2 = new Pin_1["default"](this.line.getDomElement(), options.value[1], options.pinUp);
            this.input2 = new Input_1["default"](block, options.value[1], options.min, options.max);
        }
        this.totalWidth = this.line.getLineWidth();
        this.rangeKo = model.getRangeKo(this.totalWidth, options);
        var pinPosition = model.calculatePinPosition((options.value[0] - options.min) / this.rangeKo, this.totalWidth);
        var pinUpValue = model.calculateContent(pinPosition, options, this.totalWidth);
        this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);
        this.line.setLinePosition([pinPosition]);
        this.input.getDomElement().addEventListener('input', function (ev) {
            var pinPosition = model.calculatePinPosition((ev.target.value - options.min) / _this.rangeKo, _this.totalWidth);
            var pinUpValue = model.calculateContent((ev.target.value - options.min) / _this.rangeKo, options, _this.totalWidth);
            _this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);
            _this.line.setLinePosition([pinPosition]);
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
                _this.input.setInputValue(pinUpValue);
                _this.line.setLinePosition([pinPosition]);
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
        if (this.pin2) {
            this.pin2.getDomElement().addEventListener('mousedown', function (evt) {
                evt.preventDefault();
                var startCoordinates = {
                    x: evt.clientX,
                    y: evt.clientY
                };
                var dragged = false;
                var onMouseMove = function (moveEvt) {
                    moveEvt.preventDefault();
                    dragged = true;
                    var shift = model.setShift(startCoordinates.x, moveEvt.clientX, _this.totalWidth, _this.pin2.getPinPosition(), options.step, _this.rangeKo);
                    var pinPosition = model.calculatePinPosition(shift, _this.totalWidth);
                    var pinUpValue = model.calculateContent(pinPosition, options, _this.totalWidth);
                    _this.pin2.setPinValue(pinPosition, options.pinUp, pinUpValue);
                    _this.input2.setInputValue(pinUpValue);
                    _this.line.setLinePosition([pinPosition]);
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
                        var onClickPreventDefault_2 = function (evt) {
                            evt.preventDefault();
                            _this.pin2.getDomElement().removeEventListener('click', onClickPreventDefault_2);
                        };
                        _this.pin2.getDomElement().addEventListener('click', onClickPreventDefault_2);
                    }
                };
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        }
    }
    ;
    return Presenter;
}());
exports.__esModule = true;
exports["default"] = Presenter;
;
//# sourceMappingURL=index.js.map