"use strict";
var HALF_SIZE = 8;
var Line = (function () {
    function Line(container, orientation) {
        var _this = this;
        this.getDomElement = function () {
            return _this.line;
        };
        this.getLineSize = function () {
            var size;
            switch (_this.orientation) {
                case 'horizontal':
                    size = _this.line.offsetWidth;
                    break;
                case 'vertical':
                    size = _this.line.offsetHeight;
                    break;
            }
            return size;
        };
        this.setLinePosition = function (values) {
            if (_this.orientation === 'horizontal') {
                if (values.length === 2) {
                    _this.innerLine.style.left = values[0] + HALF_SIZE + 'px';
                    _this.innerLine.style.width = values[1] - values[0] + 'px';
                    return;
                }
                _this.innerLine.style.width = values[0] + 'px';
            }
            else if (_this.orientation === 'vertical') {
                if (values.length === 2) {
                    _this.innerLine.style.top = values[0] + HALF_SIZE + 'px';
                    _this.innerLine.style.height = values[1] - values[0] + 'px';
                    return;
                }
                _this.innerLine.style.height = values[0] + 'px';
            }
        };
        this.orientation = orientation;
        var orientationLineClass = (this.orientation === 'vertical')
            ? 'slider__line--vertical'
            : 'slider__line--horizontal';
        var orientationInnerLineClass = (this.orientation === 'vertical')
            ? 'slider__inner-line--vertical'
            : 'slider__inner-line--horizontal';
        this.line = document.createElement('div');
        this.line.classList.add('slider__line', orientationLineClass);
        container.append(this.line);
        this.innerLine = document.createElement('div');
        this.innerLine.classList.add('slider__inner-line', orientationInnerLineClass);
        this.line.appendChild(this.innerLine);
    }
    return Line;
}());
exports.__esModule = true;
exports["default"] = Line;
//# sourceMappingURL=Line.js.map