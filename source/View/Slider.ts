// / <reference path="../globals.d.ts" />

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
    this.range.textContent = `от ${min} - до ${max}`;
  };
}

export default Slider;
