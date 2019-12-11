
export default class View {
  pin: HTMLElement;
  line: HTMLElement;
  innerLine: HTMLElement;
  pinUp: HTMLElement;
  range: HTMLElement;
  input: HTMLElement | any;

  constructor() {};

  createSlider = (container: JQuery<HTMLElement>, options: any): void => {
    container.addClass('slider');
    this.range = document.createElement('div');
    this.range.classList.add('slider__range');
    this.range.textContent = `от ${options.min} - до ${options.max}`;
    container.append(this.range);

    this.line = document.createElement('div');
    this.line.classList.add('slider__line');
    container.append(this.line);

    this.input = document.createElement('input');
    this.input.value = options.value;
    this.input.classList.add('slider__input');
    this.input.type = 'number';
    this.input.min = options.min;
    this.input.max = options.max;
    container.append(this.input);

    this.pin = document.createElement('div');
    this.pin.classList.add('slider__pin');
    this.line.appendChild(this.pin);

    this.innerLine = document.createElement('div');
    this.innerLine.classList.add('slider__inner-line');
    this.line.appendChild(this.innerLine);

    if (options.pinUp) {
      this.pinUp = document.createElement('div');
      this.pinUp.classList.add('slider__pin-up');
      this.pinUp.textContent = options.value;
      this.pin.appendChild(this.pinUp);
    }
  };

  getPin = (): HTMLElement => {
    return this.pin;
  };

  getLine = (): HTMLElement => {
    return this.line;
  };

  getInnerLine = (): HTMLElement => {
    return this.innerLine;
  };

  getInput = (): HTMLElement => {
    return this.input;
  };

  getPinUp = (): HTMLElement => {
    return this.pinUp;
  };
}

//// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
//// - размер шага,
// - вертикальный/горизонтальный вид,
// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
//// - возможность включать/отключать элемент над бегунком,
////который показывает значение и который ползает за мышкой
//// (при выключении просто кругляш сам только на слайдера, при включении над кругляшом элемент с цифрой).
