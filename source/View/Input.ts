
export default class Input {
  private input: HTMLInputElement;

  constructor(container: JQuery<HTMLElement>, value: number, min: number, max: number) {
    this.input = document.createElement('input');
    this.input.value = '' + value;
    this.input.classList.add('slider__input');
    this.input.type = 'number';
    this.input.min = '' + min;
    this.input.max = '' + max;
    container.append(this.input);
  }

  getDomElement = () => {
    return this.input;
  };

  setInputValue = (value: number): void => {
    this.input.value = '' + value;
  };
}
