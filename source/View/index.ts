
export default class View {
  pin: HTMLElement;
  line: HTMLElement;
  pinUp: HTMLElement;
  input: HTMLElement | any;

  constructor() {};

  createSlider = (container: JQuery<HTMLElement>, options: any): void => {
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

  getInput = (): HTMLElement => {
    return this.input;
  };

  getPinUp = (): HTMLElement => {
    return this.pinUp;
  };
}

//// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
// - размер шага,
// - вертикальный/горизонтальный вид,
// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
//// - возможность включать/отключать элемент над бегунком,
////который показывает значение и который ползает за мышкой
//// (при выключении просто кругляш сам только на слайдера, при включении над кругляшом элемент с цифрой).
