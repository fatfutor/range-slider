// / <reference path="../globals.d.ts" />
import constant from '../constant';

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
    const coordinate = (orientation === constant.VERTICAL)
      ? startCoordinates.y
      : startCoordinates.x;
    const move = (orientation === constant.VERTICAL)
      ? moveEvt.clientY
      : moveEvt.clientX;
    return coordinate - move;
  };
}

export default Model;
