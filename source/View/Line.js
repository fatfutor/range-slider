"use strict";
var HALF_WIDTH = 8;
var Line = (function () {
    function Line(container) {
        var _this = this;
        this.getDomElement = function () {
            return _this.line;
        };
        this.getLineWidth = function () {
            return _this.line.offsetWidth;
        };
        this.setLinePosition = function (values) {
            if (values.length === 2) {
                _this.innerLine.style.left = values[0] + HALF_WIDTH + 'px';
                _this.innerLine.style.width = values[1] - values[0] + 'px';
                return;
            }
            _this.innerLine.style.width = values[0] + 'px';
        };
        this.line = document.createElement('div');
        this.line.classList.add('slider__line');
        container.append(this.line);
        this.innerLine = document.createElement('div');
        this.innerLine.classList.add('slider__inner-line');
        this.line.appendChild(this.innerLine);
    }
    return Line;
}());
exports.__esModule = true;
exports["default"] = Line;
//# sourceMappingURL=Line.js.map