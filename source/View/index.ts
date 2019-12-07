
export default class View {
  container: JQuery<HTMLElement>;
  line: HTMLElement;
  pin: HTMLElement;
  pinNumeric: HTMLElement;

  constructor(container: JQuery<HTMLElement>) {
    this.container = container;
    this.container.addClass('slider');
    this.createLine();
    this.createPin();
  };

  createLine = (): void => {
    this.line = document.createElement('div');
    this.line.classList.add('slider__line');
    this.container.append(this.line);
  };

  createPin = (): void => {
    this.pin = document.createElement('div');
    this.pin.classList.add('slider__pin');
    this.line.appendChild(this.pin);
  };

  createPinNumeric = (pin: HTMLElement): void => {
    this.pinNumeric = document.createElement('p');
    this.pinNumeric.classList.add('slider__pin-numeric');
    pin.appendChild(this.pinNumeric);
  };

  getPin = (): HTMLElement => {
    return this.pin;
  };

  getPinNumeric = (): HTMLElement => {
    return this.pinNumeric;
  };

  getLine = (): HTMLElement => {
    return this.line;
  };

  changePinPosition = (top: number, left: number): void => {
    // this.pin.style.top = this.pin.offsetTop - top + 'px';
    this.pin.style.left = this.pin.offsetLeft - left + 'px';
  };

  changePinNumeric = (pin: HTMLElement): void => {
    // this.pin.style.top = this.pin.offsetTop - top + 'px';
    this.pinNumeric.textContent = pin.offsetLeft.toString();
  };

  setShiftHorizontal =
    (startCoordinate: number, moveCoordinate: number, pin: HTMLElement, line: HTMLElement): number => {

    if (pin.offsetLeft < line.offsetWidth && pin.offsetLeft >= 0) {
      return startCoordinate - moveCoordinate;
    }

    if (pin.offsetLeft < 0) return -1;

    return 1;
  };

  setShiftVertical =
    (startCoordinate: number, moveCoordinate: number, pin: HTMLElement, line: HTMLElement): number => {

    if (pin.offsetTop < line.offsetHeight && pin.offsetTop >= 0) {
      return startCoordinate - moveCoordinate;
    }

    if (pin.offsetTop < 0) return -1;

    return 1;
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
