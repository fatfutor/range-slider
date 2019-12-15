
export default class Pin {
  pin: HTMLElement | any;
  pinUp: HTMLElement;

  constructor(container: HTMLElement, value: number, pinUp: boolean) {
    this.pin = document.createElement('div');
    this.pin.classList.add('slider__pin');
    this.pin.style.left = value + 'px';
    container.appendChild(this.pin);

    if (pinUp) {
      this.pinUp = document.createElement('div');
      this.pinUp.classList.add('slider__pin-up');
      this.pinUp.textContent = value.toString();
      this.pin.appendChild(this.pinUp);
    }
  }

  getDomElement = (): HTMLElement => {
    return this.pin;
  };

  setPinValue = (value: number, pinUp: boolean, pinUpValue: number = 0): void => {
    this.pin.style.left = value + 'px';
    if (pinUp) {
      this.pinUp.textContent = pinUpValue.toString();
    }
  };

  getPinPosition = (): number => {
    return this.pin.offsetLeft;
  };
}
