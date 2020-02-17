// / <reference path="../globals.d.ts" />
import constant from '../constant';

class Model {
  getRangeKo = (getRangeKoParameters: IGetRangeKoParameters): number => {
    const { width, max, min } = getRangeKoParameters;

    return (max - min) / width;
  };

  calculateContent = (calculateContentParameters: ICalculateContentParameters): number => {
    const {
      pinPosition, max, min, totalSize
    } = calculateContentParameters;

    const rangeKo = (max - min) / totalSize;
    let content = (Math.round(pinPosition * rangeKo) + min);
    if (content < min) content = min;
    if (content > max) content = max;
    return content;
  };

  calculatePinPosition = (calcPinPosParameters: ICalcPinPosParameters): number => {
    const {
      shift, pinPosition, totalSize, stepKo
    } = calcPinPosParameters;
    let position: number = pinPosition - shift;
    if (position < 0) position = 0;
    if ((pinPosition + stepKo) > totalSize && shift < 0) position = pinPosition;
    if ((pinPosition - stepKo) < 0 && shift > 0) position = pinPosition;
    if (position > totalSize) position = totalSize;

    return position;
  };

  calculateStartPinPosition = (calcStartPinPosParameters: ICalcStartPinPosParameters): number => {
    const {
      totalSize, max, min, item
    } = calcStartPinPosParameters;

    return (totalSize / (max - min)) * (item - min);
  };

  setStartValues = (setStartValuesParameters: ISetStartValuesParameters): Array<number> => {
    const {
      values, totalSize, max, min
    } = setStartValuesParameters;

    const array: Array<number> = [];
    values.forEach((it) => {
      let value = totalSize / (max - min);
      value *= (it - min);
      array.push(value);
    });
    return array;
  };

  setShift = (setShiftParameters: ISetShiftParameters): number => {
    const {
      startCoordinates, moveEvt, orientation, step, rangeKo
    } = setShiftParameters;

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

interface IGetRangeKoParameters {
  width: number;
  max: number;
  min: number;
}

interface ICalculateContentParameters {
  pinPosition: number;
  max: number;
  min: number;
  totalSize: number;
}

interface ICalcPinPosParameters {
  shift: number;
  pinPosition: number;
  totalSize: number;
  stepKo: number;
}

interface ICalcStartPinPosParameters {
  totalSize: number;
  max: number;
  min: number;
  item: number;
}

interface ISetStartValuesParameters {
  values: Array<number>;
  totalSize: number;
  min: number;
  max: number;
}

interface ISetShiftParameters {
  startCoordinates: IMousePosition;
  moveEvt: MouseEvent;
  orientation: string;
  step: number;
  rangeKo: number;
}

interface IMousePosition {
  x: number;
  y: number;
}

export default Model;
