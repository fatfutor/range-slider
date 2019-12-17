export default class Model {

  getRangeKo = (width: number, options: any): number => {
    return (options.max - options.min)/ width;
  };

  calculateContent = (value: number, options: any, totalSize: number): number => {
    const rangeKo = (options.max - options.min) / totalSize;
    let content = (Math.round(value * rangeKo) + options.min);
    if (content < options.min) content =  options.min;
    if (content > options.max) content =  options.max;
    return content;
  };

  calculatePinPosition = (shift: number, totalSize: number): number => {
    let position: number = shift;
    if (position < 0) position = 0;
    if (position > totalSize) position = totalSize;
    return position;
  };

  setStartValues = (values: Array<number>, totalWidth: number, min: number, max: number): Array<number> => {
    const array: Array<number> = [];
    values.forEach((it) => {
      const value = totalWidth / (max - min) * (it -  min);
      array.push(value);
    });
    return array;
  };

  setShift = (startCoordinate: number, moveCoordinate: number, totalSize: number, pinPosition: number, step: number = 0, rangeKo: number): number => {

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

  validateData = (values: Array<number>, value: number, idx: number): number => {
    switch (idx) {
      case 0:
        if (value >= values[1]) {
          return values[1] - 1
        }
        return value;

      case 1:
        if (value <= values[0]) {
          return values[0] + 1
        }
        return value;
    }
  };

  validatePinValues = (minMax: Array<number>, pins: Array<number>): Array<number> => {
    if(minMax[0] > pins[0]) {
      pins[0] = minMax[0];
    }

    if(minMax[1] < pins[pins.length -1]) {
      pins[pins.length -1] = minMax[1];
    }

    if(pins.length === 2) {
      if(pins[0] > pins[1]) {
        pins[0] = minMax[0];
        pins[1] = minMax[1];
      }
    }

    return pins
  };

  validateMin = (min: number, max: number): number => {
    if (min < 0) min = 0;
    if (min >= max) min = max - 1;
    return min;
  }
}
