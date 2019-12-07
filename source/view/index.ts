
export default class View {
  container: JQuery<HTMLElement>;
  pin: HTMLElement;
  line: HTMLElement;

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

  getPin = (): HTMLElement => {
    return this.pin;
  };

  getLine = (): HTMLElement => {
    return this.line;
  };

  changePinPosition = (top: number, left: number): void => {
    // this.pin.style.top = this.pin.offsetTop - top + 'px';
    this.pin.style.left = this.pin.offsetLeft - left + 'px';
  };
}
