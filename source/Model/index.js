"use strict";
var Model = (function () {
    function Model() {
        this.getRangeKo = function (width, options) { return (options.max - options.min) / width; };
        this.calculateContent = function (pinPosition, options, totalSize, step) {
            var rangeKo = (options.max - options.min) / totalSize;
            var content = (Math.round(pinPosition * rangeKo) + options.min);
            if (step > 1) {
                var x = content % step;
                content -= x;
            }
            if (content < options.min)
                content = options.min;
            if (content > options.max)
                content = options.max;
            return content;
        };
        this.calculatePinPosition = function (shift, pinPosition, totalSize) {
            var position = pinPosition - shift;
            if (position < 0)
                position = 0;
            if (position > totalSize)
                position = totalSize;
            return position;
        };
        this.setStartValues = function (values, totalSize, min, max) {
            var array = [];
            values.forEach(function (it) {
                var value = totalSize / (max - min) * (it - min);
                array.push(value);
            });
            return array;
        };
        this.setShift = function (startCoordinates, moveEvt, orientation) {
            var coordinate = (orientation === 'vertical') ? startCoordinates.y : startCoordinates.x;
            var move = (orientation === 'vertical') ? moveEvt.clientY : moveEvt.clientX;
            return coordinate - move;
        };
        this.validateData = function (values, value, idx) {
            switch (idx) {
                case 0:
                    if (value >= values[1]) {
                        return values[1] - 1;
                    }
                    return value;
                case 1:
                    if (value <= values[0]) {
                        return values[0] + 1;
                    }
                    return value;
            }
        };
        this.validatePinValues = function (minMax, pins) {
            if (minMax[0] > pins[0]) {
                pins[0] = minMax[0];
            }
            if (minMax[1] < pins[pins.length - 1]) {
                pins[pins.length - 1] = minMax[1];
            }
            if (pins.length === 2) {
                if (pins[0] > pins[1]) {
                    pins[0] = minMax[0];
                    pins[1] = minMax[1];
                }
            }
            return pins;
        };
        this.validateMin = function (min, max) {
            if (min < 0)
                min = 0;
            if (min >= max)
                min = max - 1;
            return min;
        };
    }
    return Model;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
//# sourceMappingURL=index.js.map