
export default class Input {
  input: HTMLElement | any;

  constructor(container: JQuery<HTMLElement>, value: number, min: number, max: number) {
    this.input = document.createElement('input');
    this.input.value = value;
    this.input.classList.add('slider__input');
    this.input.type = 'number';
    this.input.min = min;
    this.input.max = max;
    this.input.setAttribute('readonly', true);
    container.append(this.input);
  }

  getDomElement = (): HTMLElement | any => {
    return this.input;
  };

  setInputValue = (value: number): void => {
    this.input.value = value;
  };
}
