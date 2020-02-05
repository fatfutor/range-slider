// / <reference path="../globals.d.ts" />

class Model {
  getRangeKo = (width: number, max: number, min: number): number => (max - min) / width;

  calculateContent =
  (pinPosition: number, max: number, min: number, totalSize: number, step: number): number => {
    const rangeKo = (max - min) / totalSize;
    let content = (Math.round(pinPosition * rangeKo) + min);

    if (step > 1) {
      const x = content % step;
      content -= x;
    }

    if (content < min) content = min;
    if (content > max) content = max;
    return content;
  };

  calculatePinPosition = (shift: number, pinPosition: number, totalSize: number): number => {
    let position: number = pinPosition - shift;
    if (position < 0) position = 0;
    if (position > totalSize) position = totalSize;
    return position;
  };

  calculateStartPinPosition = (
    totalSize: number,
    max: number,
    min: number,
    item: number
  ): number => (totalSize / (max - min)) * (item - min);

  setStartValues =
  (values: Array<number>, totalSize: number, min: number, max: number): Array<number> => {
    const array: Array<number> = [];
    values.forEach((it) => {
      let value = totalSize / (max - min);
      value *= (it - min);
      array.push(value);
    });
    return array;
  };

  setShift =
  (startCoordinates: MousePosition, moveEvt: MouseEvent, orientation: string): number => {
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
      default: return;
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
}

export default Model;
