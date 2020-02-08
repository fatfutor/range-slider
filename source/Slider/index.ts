// <reference path="./globals.d.ts" />
import '../main.scss';
import Presenter from '../Presenter';

class Slider {
  constructor() {
    this.initSlider(jQuery)
  }
  private initSlider($: any) {
    $.fn.myPlugin = function (options: Options) {
      return new Presenter($(this), options);
    };
  }
}

new Slider();
