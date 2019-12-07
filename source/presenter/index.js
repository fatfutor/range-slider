"use strict";
var Presenter = (function () {
    function Presenter(view, model, options) {
        var _this = this;
        this.view = view;
        this.pin = view.getPin();
        view.createPinNumeric(this.pin);
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
                var line = view.getLine();
                var x = view.setShiftHorizontal(startCoordinates.x, moveEvt.clientX, _this.pin, line);
                var y = view.setShiftVertical(startCoordinates.y, moveEvt.clientY, _this.pin, line);
                _this.view.changePinPosition(y, x);
                _this.view.changePinNumeric(_this.pin);
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