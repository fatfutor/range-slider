
export default class Pin {
  private pin: HTMLElement;
  private pinUp: HTMLElement;
  private orientation: string;

  constructor(
    container: HTMLElement,
    value: number,
    pinUp: boolean,
    pinUpValue: number,
    orientation: string = 'horizontal'
  ) {
    this.orientation = orientation;
    this.pin = document.createElement('div');
    this.pin.classList.add('slider__pin');
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

    this.setPinValue(value, pinUp, pinUpValue);
  }

  getDomElement = (): HTMLElement => {
    return this.pin;
  };

  setPinValue = (value: number, pinUp: boolean = false, pinUpValue: number = 0): void => {

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

  getPinPosition = (): number => {
    switch (this.orientation) {
      case 'horizontal': return this.pin.offsetLeft;

      case 'vertical': return this.pin.offsetTop;
    }
  };
}
