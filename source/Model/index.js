"use strict";
var Model = (function () {
    function Model() {
        this.setShiftHorizontal = function (startCoordinate, moveCoordinate, pin, line) {
            if (pin.offsetLeft < line.offsetWidth && pin.offsetLeft >= 0) {
                return startCoordinate - moveCoordinate;
            }
            if (pin.offsetLeft < 0)
                return -1;
            return 1;
        };
        this.setShiftVertical = function (startCoordinate, moveCoordinate, pin, line) {
            if (pin.offsetTop < line.offsetHeight && pin.offsetTop >= 0) {
                return startCoordinate - moveCoordinate;
            }
            if (pin.offsetTop < 0)
                return -1;
            return 1;
        };
    }
    return Model;
}());
exports.__esModule = true;
exports["default"] = Model;
//# sourceMappingURL=index.js.map