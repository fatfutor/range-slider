
export default class Input {
  input: HTMLElement;

  constructor(container: JQuery<HTMLElement>, value: string = '0') {
    this.input = document.createElement('input');
    this.input.setAttribute('value', value);
    this.input.classList.add('slider__input');
    container.append(this.input);
  }

  getElement = () => {
    return this.input;
  };
}
