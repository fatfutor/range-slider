
export default class Pin {
  pin: HTMLElement | any;
  pinUp: HTMLElement;
  orientation: string;

  constructor(container: HTMLElement, value: number, pinUp: boolean, pinUpValue?: number, orientation: string = 'horizontal') {
    this.orientation = orientation;
    this.pin = document.createElement('div');
    this.pin.classList.add('slider__pin');
    this.setStartPinValue(value);
    container.appendChild(this.pin);

    if (pinUp) {
      const pinUpOrientationClass = (this.orientation === 'vertical')
        ? 'slider__pin-up--vertical'
        : 'slider__pin-up--horizontal';
      this.pinUp = document.createElement('div');
      this.pinUp.classList.add('slider__pin-up', pinUpOrientationClass);
      this.pinUp.textContent = pinUpValue.toString();
      this.pin.appendChild(this.pinUp);
    }
  }

  getDomElement = (): HTMLElement => {
    return this.pin;
  };

  setPinValue = (value: number, pinUp: boolean, pinUpValue: number = 0): void => {

    switch (this.orientation) {
      case 'horizontal': this.pin.style.left = value + 'px';
        break;

      case 'vertical': this.pin.style.top = value + 'px';
        break;
    }

    if (pinUp) {
      this.pinUp.textContent = pinUpValue.toString();
    }
  };

  setStartPinValue = (value: number): void => {

    switch (this.orientation) {
      case 'horizontal': this.pin.style.left = value + 'px';
        break;

      case 'vertical': this.pin.style.top = value + 'px';
        break;
    }
  };

  getPinPosition = (): number => {
    switch (this.orientation) {
      case 'horizontal': return this.pin.offsetLeft;

      case 'vertical': return this.pin.offsetTop;
    }
  };
}
