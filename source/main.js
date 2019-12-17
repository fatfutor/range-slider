"use strict";
var Presenter_1 = require('./Presenter');
var Panel = (function () {
    function Panel(block, options) {
        var _this = this;
        this.container = document.querySelector("#" + block[0].id);
        this.options = options;
        this.slider = new Presenter_1["default"](block, options);
        this.vertical = this.container.querySelector('.panel__input[name="vertical"]');
        this.pinUp = this.container.querySelector('.panel__input[name="pin-up"]');
        this.min = this.container.querySelector('.panel__input[name="min"]');
        this.max = this.container.querySelector('.panel__input[name="max"]');
        this.step = this.container.querySelector('.panel__input[name="step"]');
        this.vertical.addEventListener('change', function () {
            if (_this.vertical.checked) {
                _this.options.orientation = 'vertical';
            }
            else {
                _this.options.orientation = 'horizontal';
            }
            _this.slider.changeOptions(_this.options);
        });
        this.pinUp.addEventListener('change', function () {
            _this.options.pinUp = !!_this.pinUp.checked;
            _this.slider.changeOptions(_this.options);
        });
        this.min.addEventListener('change', function () {
            _this.options.min = +_this.min.value;
            _this.slider.changeOptions(_this.options);
        });
        this.max.addEventListener('change', function () {
            _this.options.max = +_this.max.value;
            _this.slider.changeOptions(_this.options);
        });
        this.step.addEventListener('change', function () {
            _this.options.step = +_this.step.value;
            _this.slider.changeOptions(_this.options);
        });
    }
    return Panel;
}());
exports.__esModule = true;
exports["default"] = Panel;
//# sourceMappingURL=main.js.map