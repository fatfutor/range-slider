import constant from '../constant';

class Pin {
  private pin: HTMLElement;

  private pinUp: HTMLElement;

  private orientation: string;

  constructor(
    container: HTMLElement,
    value: number,
    pinUp: boolean,
    pinUpValue: number,
    orientation: string = constant.HORIZONTAL
  ) {
    this.createPin({
      container, value, pinUp, pinUpValue, orientation
    });
  }

  private createPin = (createPinParameters: ICreatePinParameters): void => {
    const {
      container, value, pinUp, pinUpValue, orientation
    } = createPinParameters;

    this.orientation = orientation;
    this.pin = document.createElement('div');
    this.pin.classList.add('slider__pin');
    container.appendChild(this.pin);

    if (pinUp) {
      const pinUpOrientationClass = (this.orientation === constant.VERTICAL)
        ? 'slider__pin-up--vertical'
        : 'slider__pin-up--horizontal';
      this.pinUp = document.createElement('div');
      this.pinUp.classList.add('slider__pin-up', pinUpOrientationClass);
      this.pinUp.textContent = pinUpValue.toString();
      this.pin.appendChild(this.pinUp);
    }

    this.setPinValue(value, pinUp, pinUpValue);
  };

  getDomElement = (): HTMLElement => this.pin;

  setPinValue = (value: number, pinUp: boolean = false, pinUpValue: number = 0): void => {
    if (this.orientation === constant.HORIZONTAL) {
      this.pin.style.left = `${value}px`;
    }

    if (this.orientation === constant.VERTICAL) {
      this.pin.style.top = `${value}px`;
    }

    if (pinUp) {
      this.pinUp.textContent = pinUpValue.toString();
    }
  };
}

interface ICreatePinParameters {
  container: HTMLElement;
  value: number;
  pinUp: boolean;
  pinUpValue: number;
  orientation: string;
}

export default Pin;
