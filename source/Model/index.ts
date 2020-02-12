// / <reference path="../globals.d.ts" />
import constant from '../constant';

class Model {
  getRangeKo = (width: number, max: number, min: number): number => (max - min) / width;

  calculateContent =
  (pinPosition: number, max: number, min: number, totalSize: number): number => {
    const rangeKo = (max - min) / totalSize;
    let content = (Math.round(pinPosition * rangeKo) + min);

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
  (startCoordinates: MousePosition, moveEvt: MouseEvent, orientation: string, step: number, rangeKo: number): number => {

    const stepKo = step / rangeKo;
    let movedCoordinate = 0;
    let moduleMovedCoordinate = 0;

    if (orientation === constant.HORIZONTAL) {
      movedCoordinate = moveEvt.clientX - startCoordinates.x;
    } else if (orientation === constant.VERTICAL) {
      movedCoordinate = moveEvt.clientY - startCoordinates.y;
    }

    if (movedCoordinate > 0) {
      moduleMovedCoordinate = Math.floor((movedCoordinate) / stepKo);
    } else if (movedCoordinate < 0) {
      moduleMovedCoordinate = Math.ceil((movedCoordinate) / stepKo);
    }

    return -(moduleMovedCoordinate * stepKo);
  };
}

export default Model;
