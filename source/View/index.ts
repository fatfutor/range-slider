
export default class View {
  pin: HTMLElement;
  line: HTMLElement;
  pinUp: HTMLElement;
  input: HTMLElement | any;
  rangeKo: number;

  constructor() {};

  createSlider = (container: JQuery<HTMLElement>, options: any) => {
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

    this.rangeKo = this.getRangeKo(this.line.offsetWidth, options);

    this.setPinPosition((options.value - options.min) / this.rangeKo);

    if (options.pinUp) {
      this.pinUp = document.createElement('div');
      this.pinUp.classList.add('slider__pin-up');
      this.pinUp.textContent = options.value;
      this.pin.appendChild(this.pinUp);
    }
  };

  setPinPosition = (shift: number): void => {
    this.pin.style.left = shift + 'px';
  };

  setPinUp = (value: number, rangeKo: number, options: any): void => {
    this.pinUp.textContent = (Math.round(value * rangeKo) + options.min).toString();
  };

  setInputValue = (value: number, rangeKo: number, options: any): void => {
    this.input.value = (Math.round(value * rangeKo) + options.min).toString();
  };

  setShift = (startCoordinate: number, moveCoordinate: number): number => {

    let shift = 0;

    if (this.pin.offsetLeft < this.line.offsetWidth && this.pin.offsetLeft >= 0) {
      shift =  startCoordinate - moveCoordinate;
      return this.pin.offsetLeft - shift;
    }

    if (this.pin.offsetLeft < 0) {
      shift = -1;
      return this.pin.offsetLeft - shift;
    }

    shift = 1;

    return this.pin.offsetLeft - shift;
  };

  getPin = () => {
    return this.pin;
  };

  getLine = () => {
    return this.line;
  };

  getInput = () => {
    return this.input;
  };

  getRangeKo = (width: number, options: any) => {
    return (options.max - options.min)/ width;
  }
}

// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
// - два бегунка?
// - размер шага,
// - вертикальный/горизонтальный вид,
// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
// - возможность включать/отключать элемент над бегунком,
// который показывает значение и который ползает за мышкой
// (при выключении просто кругляш сам только на слайдера, при включении над кругляшом элемент с цифрой).
