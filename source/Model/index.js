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
        this.setShift = function (startCoordinate, moveCoordinate, totalSize, pinPosition, step, rangeKo) {
            if (step === void 0) { step = 0; }
            var shift = 0;
            if (pinPosition < totalSize && pinPosition >= 0) {
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
            shift = 1;
            return pinPosition - shift;
        };
    }
    return Model;
}());
exports.__esModule = true;
exports["default"] = Model;
//# sourceMappingURL=index.js.map