
export default class Slider {
  range: HTMLElement;

  createSlider = (container: JQuery<HTMLElement>, options: any): void => {
    container.addClass('slider');
    this.range = document.createElement('div');
    this.range.classList.add('slider__range');
    this.range.textContent = `от ${options.min} - до ${options.max}`;
    container.append(this.range);
  };
  
  setMinMax = (min: number, max: number) => {
    this.range.textContent = `от ${min} - до ${max}`;
  }
}
