// / <reference path="../globals.d.ts" />
import util from '../util';

class Slider {
  private range: HTMLElement;

  createSlider = (container: JQuery<HTMLElement>, options: Options): void => {
    container.addClass('slider');
    this.range = document.createElement('div');
    this.range.classList.add('slider__range');
    this.range.textContent = `от ${options.min} - до ${options.max}`;
    container.append(this.range);
  };

  setMinMax = (min: number, max: number): void => {
    this.range.textContent = `от ${util.makeMinLessMax(min, max)} - до ${max}`;
  };
}

export default Slider;
