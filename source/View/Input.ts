
class Input {
  private input: HTMLInputElement;

  constructor(container: JQuery<HTMLElement>, value: number, min: number, max: number) {
    this.createInput({
      container, value, min, max
    });
  }

  private createInput = (createInputParameters: ICreateInputParameters): void => {
    const {
      container, value, min, max
    } = createInputParameters;
    this.input = document.createElement('input');
    this.input.value = `${value}`;
    this.input.classList.add('slider__input');
    this.input.type = 'number';
    this.input.min = `${min}`;
    this.input.max = `${max}`;
    container.append(this.input);
  };

  getDomElement = () => this.input;

  setInputValue = (value: number): void => {
    this.input.value = `${value}`;
  };
}

interface ICreateInputParameters {
  container: JQuery<HTMLElement>;
  value: number;
  min: number;
  max: number;
}

export default Input;
