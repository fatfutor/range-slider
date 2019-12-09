"use strict";
var Presenter = (function () {
    function Presenter(view, model, block, options) {
        var _this = this;
        this.view = view;
        this.view.createSlider(block, options);
        this.pin = view.getPin();
        this.input = view.getInput();
        this.line = view.getLine();
        this.rangeKo = view.getRangeKo(this.line.offsetWidth, options);
        this.input.addEventListener('input', function (ev) {
            _this.view.setPinPosition(ev.target.value / _this.rangeKo);
            _this.view.setPinUp(ev.target.value / _this.rangeKo, _this.rangeKo);
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
                var shiftX = view.setShift(startCoordinates.x, moveEvt.clientX);
                _this.view.setPinPosition(shiftX);
                _this.view.setPinUp(_this.pin.offsetLeft, _this.rangeKo);
                _this.view.setInputValue(_this.pin.offsetLeft, _this.rangeKo);
                startCoordinates = {
                    x: moveEvt.clientX,
                    y: moveEvt.clientY
                };
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