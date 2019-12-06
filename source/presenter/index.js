"use strict";
var Presenter = (function () {
    function Presenter(pin) {
        var _this = this;
        this.allCode = function () {
            var that = _this;
            _this.pin.addEventListener('mousedown', function (evt) {
                evt.preventDefault();
                var startCoords = {
                    x: evt.clientX,
                    y: evt.clientY
                };
                var dragged = false;
                var onMouseMove = function (moveEvt) {
                    moveEvt.preventDefault();
                    dragged = true;
                    var shift = {
                        x: startCoords.x - moveEvt.clientX,
                        y: startCoords.y - moveEvt.clientY
                    };
                    startCoords = {
                        x: moveEvt.clientX,
                        y: moveEvt.clientY
                    };
                    that.pin.style.top = (that.pin.offsetTop - shift.y) + 'px';
                    that.pin.style.left = (that.pin.offsetLeft - shift.x) + 'px';
                };
                var onMouseUp = function (upEvt) {
                    upEvt.preventDefault();
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    if (dragged) {
                        var onClickPreventDefault_1 = function (evt) {
                            evt.preventDefault();
                            that.pin.removeEventListener('click', onClickPreventDefault_1);
                        };
                        that.pin.addEventListener('click', onClickPreventDefault_1);
                    }
                };
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        };
        this.pin = pin;
        this.allCode();
    }
    ;
    return Presenter;
}());
exports.__esModule = true;
exports["default"] = Presenter;
;
//# sourceMappingURL=index.js.map