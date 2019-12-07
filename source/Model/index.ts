export default class Model {
  constructor() {}

  setShiftHorizontal = (
    startCoordinate: number, 
    moveCoordinate: number, 
    pin: HTMLElement, 
    line: HTMLElement
  ): number => {

    if (pin.offsetLeft < line.offsetWidth && pin.offsetLeft >= 0) {
      return startCoordinate - moveCoordinate;
    }

    if (pin.offsetLeft < 0) return -1;

    return 1;
  };

  setShiftVertical = (
    startCoordinate: number,
    moveCoordinate: number,
    pin: HTMLElement,
    line: HTMLElement
  ): number => {

    if (pin.offsetTop < line.offsetHeight && pin.offsetTop >= 0) {
      return startCoordinate - moveCoordinate;
    }

    if (pin.offsetTop < 0) return -1;

    return 1;
  }
}
