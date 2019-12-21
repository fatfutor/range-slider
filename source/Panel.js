"use strict";
var Presenter_1 = require('./Presenter');
var Panel = (function () {
    function Panel(block, options) {
        var _this = this;
        this.getValues = function () {
            var values = _this.container.querySelectorAll('.slider__input');
            var array = [];
            for (var i = 0; i < values.length; i++) {
                array.push(+values[i].value);
            }
            return array;
        };
        this.container = document.querySelector("#" + block[0].id);
        this.options = options;
        this.slider = new Presenter_1.default(block, options);
        this.vertical = this.container.querySelector('.panel__input[name="vertical"]');
        this.pinUp = this.container.querySelector('.panel__input[name="pin-up"]');
        this.min = this.container.querySelector('.panel__input[name="min"]');
        this.max = this.container.querySelector('.panel__input[name="max"]');
        this.step = this.container.querySelector('.panel__input[name="step"]');
        this.interval = this.container.querySelector('.panel__input[name="interval"]');
        this.vertical.addEventListener('change', function () {
            _this.options.values = _this.getValues();
            if (_this.vertical.checked) {
                _this.options.orientation = 'vertical';
            }
            else {
                _this.options.orientation = 'horizontal';
            }
            _this.slider.changeOptions(_this.options);
        });
        this.pinUp.addEventListener('change', function () {
            _this.options.values = _this.getValues();
            _this.options.pinUp = !!_this.pinUp.checked;
            _this.slider.changeOptions(_this.options);
        });
        this.min.addEventListener('change', function () {
            _this.options.values = _this.getValues();
            _this.options.min = +_this.min.value;
            _this.slider.changeOptions(_this.options);
        });
        this.max.addEventListener('change', function () {
            _this.options.values = _this.getValues();
            _this.options.max = +_this.max.value;
            _this.slider.changeOptions(_this.options);
        });
        this.step.addEventListener('change', function () {
            _this.options.values = _this.getValues();
            _this.options.step = +_this.step.value;
            _this.slider.changeOptions(_this.options);
        });
        this.interval.addEventListener('change', function () {
            _this.options.values = _this.getValues();
            if (_this.interval.checked) {
                _this.options.values[1] = _this.options.max;
            }
            else {
                _this.options.values = _this.options.values.slice(0, 1);
            }
            _this.slider.changeOptions(_this.options);
        });
    }
    return Panel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Panel;
//# sourceMappingURL=Panel.js.map