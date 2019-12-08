"use strict";
var Line = (function () {
    function Line(container) {
        var _this = this;
        this.getElement = function () {
            return _this.line;
        };
        this.line = document.createElement('div');
        this.line.classList.add('slider__line');
        container.append(this.line);
    }
    return Line;
}());
exports.__esModule = true;
exports["default"] = Line;
//# sourceMappingURL=Line.js.map