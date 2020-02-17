
const makeMinLessMax = (min: number, max: number): number => {
  let minValue: number = min;
  if (min > max) minValue = max - 1;
  return minValue;
};

const makePinValueLimit = (makePinValueLimitParameters: IMakePinValueLimit): number => {
  const {
    values, value, idx
  } = makePinValueLimitParameters;
  if (idx === 0) {
    if (value >= values[1]) {
      return values[1];
    }
    return value;
  }
  if (idx === 1) {
    if (value <= values[0]) {
      return values[0];
    }
    return value;
  }
  return value;
};

const validateOptionsPinValues = (minMax: Array<number>, pins: Array<number>): Array<number> => {
  const array: Array<number> = [];
  const firstElementMinMax = minMax[0];
  const secondElementMinMax = minMax[1];
  let firstElementPin = pins[0];
  let secondElementPin = pins[1];

  if (firstElementMinMax > firstElementPin) {
    firstElementPin = firstElementMinMax;
  }

  if (secondElementMinMax < pins[pins.length - 1]) {
    secondElementPin = secondElementMinMax;
  }

  if (pins.length === 2) {
    if (firstElementPin > secondElementPin) {
      firstElementPin = firstElementMinMax;
      secondElementPin = secondElementMinMax;
    }
  }

  array.push(firstElementPin);
  if (secondElementPin) array.push(secondElementPin);

  return array;
};

const validateStep = (min: number, max: number, step: number): number => {
  let stepValue = step;
  const maxSizeStep = (max - min) / 2;
  if (stepValue <= 0) stepValue = 1;
  if (stepValue >= maxSizeStep) stepValue = maxSizeStep;
  return stepValue;
};

const getNearNumber = (
  arr: Array<number>, searchNumber: number
) => arr.find(
  (it: number) => Math.abs(it - searchNumber) === Math.min(...arr.map(
    (item) => Math.abs(item - searchNumber)
  ))
);

const getNearIndex = (array: Array<number>, searchNumber: number) => {
  let index = 0;
  array.forEach((it, idx) => {
    if (it === getNearNumber(array, searchNumber)) {
      index = idx;
    }
  });
  return index;
};

const validateLineStep = (pin: number, stepKo: number, clickPosition: number): number => {
  const pinPosition: number = Math.round((clickPosition - pin) / stepKo) * stepKo;
  return pin + pinPosition;
};

const validateLineCoordinate = (coordinate: number, totalSize: number): number => {
  let coordinateValue: number = coordinate;
  if (coordinate > totalSize) coordinateValue = totalSize;
  if (coordinate < 0) coordinateValue = 0;
  return coordinateValue;
};

interface IMakePinValueLimit {
  values: Array<number>;
  value: number;
  idx: number;
}

const util = {
  makeMinLessMax,
  makePinValueLimit,
  validateOptionsPinValues,
  validateStep,
  getNearIndex,
  validateLineStep,
  validateLineCoordinate,
};

export default util;
