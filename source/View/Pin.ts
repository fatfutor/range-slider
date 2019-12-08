
export default class Pin {
  pin: HTMLElement;

  constructor(container: JQuery<HTMLElement>, left: string = '0', top: string = '0') {
    this.pin = document.createElement('div');
    this.pin.classList.add('slider__pin');
    this.pin.style.left = left;
    this.pin.style.top = top;
    container.append(this.pin);
  }

  getElement = () => {
    return this.pin;
  };

  setShiftHorizontal = (startCoordinate: number, moveCoordinate: number, line: HTMLElement): number => {

      if (this.pin.offsetLeft < line.offsetWidth && this.pin.offsetLeft >= 0) {
        return startCoordinate - moveCoordinate;
      }

      if (this.pin.offsetLeft < 0) return -1;

      return 1;
    };

  setShiftVertical = (startCoordinate: number, moveCoordinate: number, line: HTMLElement): number => {

      if (this.pin.offsetTop < line.offsetHeight && this.pin.offsetTop >= 0) {
        return startCoordinate - moveCoordinate;
      }

      if (this.pin.offsetTop < 0) return -1;

      return 1;
    };

  changePinPosition = (top: number, left: number): void => {
    this.pin.style.top = this.pin.offsetTop - top + 'px';
    this.pin.style.left = this.pin.offsetLeft - left + 'px';
  };
}
