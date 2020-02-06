// / <reference path="../globals.d.ts" />
import util from '../util';

class Container {
  private range: HTMLElement;

  createContainer = (container: JQuery<HTMLElement>, min: number, max: number): void => {
    container.addClass('slider');
    this.range = document.createElement('div');
    this.range.classList.add('slider__range');
    this.range.textContent = `от ${min} - до ${max}`;
    container.append(this.range);
  };

  setMinMax = (min: number, max: number): void => {
    this.range.textContent = `от ${util.makeMinLessMax(min, max)} - до ${max}`;
  };
}

export default Container;
