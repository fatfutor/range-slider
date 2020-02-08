// <reference path="./globals.d.ts" />

import './Slider';

class Panel {
  private slider: ISlider;

  constructor(containerSelector: string, options: Options) {
    this.initPanel(containerSelector, options);
  }
  
  initPanel(containerSelector: string, options: Options): void {
    this.slider = $(containerSelector).myPlugin(options);
  }
}

export default Panel;
