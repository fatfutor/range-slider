"use strict";
var Model = (function () {
    function Model() {
        this.getRangeKo = function (width, options) {
            return (options.max - options.min) / width;
        };
        this.calculateContent = function (value, options, totalSize) {
            var rangeKo = (options.max - options.min) / totalSize;
            var content = (Math.round(value * rangeKo) + options.min);
            if (content < options.min)
                content = options.min;
            if (content > options.max)
                content = options.max;
            return content;
        };
        this.calculatePinPosition = function (shift, totalSize) {
            var position = shift;
            if (position < 0)
                position = 0;
            if (position > totalSize)
                position = totalSize;
            return position;
        };
        this.setStartValues = function (values, totalWidth, min, max) {
            var array = [];
            values.forEach(function (it) {
                var value = totalWidth / (max - min) * (it - min);
                array.push(value);
            });
            return array;
        };
        this.setShift = function (startCoordinate, moveCoordinate, totalSize, pinPosition, step, rangeKo) {
            if (step === void 0) { step = 0; }
            var shift = 0;
            if (pinPosition <= totalSize && pinPosition >= 0) {
                if (step && moveCoordinate - startCoordinate >= step / rangeKo) {
                    shift = startCoordinate - moveCoordinate;
                    var regulator = (pinPosition - shift) % (step / rangeKo);
                    return pinPosition - shift - regulator;
                }
                else if (step && startCoordinate - moveCoordinate >= step / rangeKo) {
                    shift = startCoordinate - moveCoordinate;
                    var regulator = (pinPosition - shift) % (step / rangeKo);
                    return pinPosition - shift - regulator;
                }
                else if (step) {
                    return pinPosition;
                }
                shift = startCoordinate - moveCoordinate;
                return pinPosition - shift;
            }
            if (pinPosition < 0) {
                shift = -1;
                return pinPosition - shift;
            }
            shift = 0;
            return pinPosition - shift;
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
exports.__esModule = true;
exports["default"] = Model;
//# sourceMappingURL=index.js.map