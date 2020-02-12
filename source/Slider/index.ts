// <reference path="./globals.d.ts" />
import '../main.scss';
import Presenter from '../Presenter';

class Slider {
  constructor() {
    this.initSlider();
  }

  private initSlider(): void {
    $.fn.myPlugin = function (options: IOptions) {
      return new Presenter($(this), options);
    };
  }
}

new Slider();
