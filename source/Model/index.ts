export default class Model {
  constructor() {}

  getRangeKo = (width: number, options: any): number => {
    return (options.max - options.min)/ width;
  };

  calculateContent = (value: number, options: any, totalSize): number => {
    const rangeKo = (options.max - options.min) / totalSize;
    let content = (Math.round(value * rangeKo) + options.min);
    if (content < options.min) content =  options.min;
    if (content > options.max) content =  options.max;
    return content;
  };

  calculatePinPosition = (shift: number, totalSize): number => {
    let position = shift;
    if (position < 0) position = 0;
    if (position > totalSize) position = totalSize;
    return position;
  };

  setShift = (
    startCoordinate: number,
    moveCoordinate: number,
    totalSize: number,
    pinPosition: number,
    step: number = 0,
    rangeKo: number
  ): number => {

    let shift = 0;

    if (pinPosition <= totalSize && pinPosition >= 0) {
      if (step && moveCoordinate - startCoordinate >= step / rangeKo) {
        shift =  startCoordinate - moveCoordinate;
        const regulator = (pinPosition - shift) % (step / rangeKo);
        return pinPosition - shift - regulator;

      } else if (step && startCoordinate - moveCoordinate >= step / rangeKo) {
        shift =  startCoordinate - moveCoordinate;
        const regulator = (pinPosition - shift) % (step / rangeKo);
        return pinPosition - shift - regulator;

      } else if (step) {
        return pinPosition
      }
      shift =  startCoordinate - moveCoordinate;
      return pinPosition - shift;
    }

    if (pinPosition < 0) {
      shift = -1;
      return pinPosition - shift;
    }

    shift = 0;

    return pinPosition - shift;
  };
}
