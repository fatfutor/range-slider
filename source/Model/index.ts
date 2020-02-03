// / <reference path="../globals.d.ts" />

export default class Model {
  getRangeKo = (width: number, options: Options): number => (options.max - options.min) / width;

  calculateContent = (pinPosition: number, options: Options, totalSize: number, step: number): number => {
    const rangeKo = (options.max - options.min) / totalSize;
    let content = (Math.round(pinPosition * rangeKo) + options.min);

    if (step > 1) {
      const x = content % step;
      content -= x;
    }

    if (content < options.min) content = options.min;
    if (content > options.max) content = options.max;
    return content;
  };

  calculatePinPosition = (shift: number, pinPosition: number, totalSize: number): number => {
    let position: number = pinPosition - shift;
    if (position < 0) position = 0;
    if (position > totalSize) position = totalSize;
    return position;
  };

  setStartValues = (values: Array<number>, totalSize: number, min: number, max: number): Array<number> => {
    const array: Array<number> = [];
    values.forEach((it) => {
      const value = totalSize / (max - min) * (it - min);
      array.push(value);
    });
    return array;
  };

  setShift = (startCoordinates: MousePosition, moveEvt: MouseEvent, orientation: string): number => {
    const coordinate = (orientation === 'vertical') ? startCoordinates.y : startCoordinates.x;
    const move = (orientation === 'vertical') ? moveEvt.clientY : moveEvt.clientX;
    return coordinate - move;
  };

  validateData = (values: Array<number>, value: number, idx: number): number => {
    switch (idx) {
      case 0:
        if (value >= values[1]) {
          return values[1] - 1;
        }
        return value;

      case 1:
        if (value <= values[0]) {
          return values[0] + 1;
        }
        return value;
    }
  };

  validatePinValues = (minMax: Array<number>, pins: Array<number>): Array<number> => {
    if (minMax[0] > pins[0]) {
      pins[0] = minMax[0];
    }

    if (minMax[1] < pins[pins.length - 1]) {
      pins[pins.length - 1] = minMax[1];
    }

    if (pins.length === 2) {
      if (pins[0] > pins[1]) {
        pins[0] = minMax[0];
        pins[1] = minMax[1];
      }
    }
    return pins;
  };

  validateMin = (min: number, max: number): number => {
    if (min < 0) min = 0;
    if (min >= max) min = max - 1;
    return min;
  };
}
