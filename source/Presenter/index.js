"use strict";
var Presenter = (function () {
    function Presenter(view, model, block, options) {
        var _this = this;
        view.createSlider(block, options);
        this.pin = view.getPin();
        this.pinUp = view.getPinUp();
        this.input = view.getInput();
        this.line = view.getLine();
        this.totalWidth = this.line.offsetWidth;
        this.rangeKo = model.getRangeKo(this.line.offsetWidth, options);
        this.pin.style.left
            = model.calculatePinPosition((options.value - options.min) / this.rangeKo, this.totalWidth) + 'px';
        this.input.addEventListener('input', function (ev) {
            var position = model.calculatePinPosition((ev.target.value - options.min) / _this.rangeKo, _this.totalWidth);
            var content = model.calculateContent((ev.target.value - options.min) / _this.rangeKo, options, _this.totalWidth);
            _this.pin.style.left = position + 'px';
            if (options.pinUp) {
                _this.pinUp.textContent = content;
            }
        });
        this.pin.addEventListener('mousedown', function (evt) {
            evt.preventDefault();
            var startCoordinates = {
                x: evt.clientX,
                y: evt.clientY
            };
            var dragged = false;
            var onMouseMove = function (moveEvt) {
                moveEvt.preventDefault();
                dragged = true;
                var shift = model.setShift(startCoordinates.x, moveEvt.clientX, _this.totalWidth, _this.pin.offsetLeft, options.step, _this.rangeKo);
                _this.pin.style.left = model.calculatePinPosition(shift, _this.totalWidth) + 'px';
                if (moveEvt.clientX - startCoordinates.x >= options.step / _this.rangeKo
                    || startCoordinates.x - moveEvt.clientX >= options.step / _this.rangeKo) {
                    startCoordinates = {
                        x: moveEvt.clientX,
                        y: moveEvt.clientY
                    };
                }
                var content = model.calculateContent(_this.pin.offsetLeft, options, _this.totalWidth);
                if (options.pinUp) {
                    _this.pinUp.textContent = content.toString();
                }
                _this.input.value = content.toString();
            };
            var onMouseUp = function (upEvt) {
                upEvt.preventDefault();
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                if (dragged) {
                    var onClickPreventDefault_1 = function (evt) {
                        evt.preventDefault();
                        _this.pin.removeEventListener('click', onClickPreventDefault_1);
                    };
                    _this.pin.addEventListener('click', onClickPreventDefault_1);
                }
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }
    ;
    return Presenter;
}());
exports.__esModule = true;
exports["default"] = Presenter;
;
//# sourceMappingURL=index.js.map